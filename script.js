document.addEventListener('DOMContentLoaded', function() {
    // DOM Element References
    const searchForm = document.getElementById('search-form');
    const queryInput = document.getElementById('query-input');
    const aiModal = document.getElementById('ai-modal');
    const closeModalButton = document.getElementById('close-modal');
    const aiButtonsContainer = document.getElementById('ai-buttons-container');
    const animationArea = document.getElementById('animation-area');
    const typedTextElement = document.getElementById('typed-text');
    const typingIndicator = document.getElementById('typing-indicator');
    const instructionsElement = document.getElementById('instructions');
    const openAiButtonContainer = document.getElementById('open-ai-button-container');
    let currentQuery = '';

    // 🌟 COLOR CONFIGS 🌟
    const aiConfigs = {
        'ChatGPT': { url: 'https://chat.openai.com/', color: 'bg-gray-800' },
        'Gemini': { url: 'https://gemini.google.com/', color: 'bg-alert-red' },
        'Copilot': { url: 'https://copilot.microsoft.com/', color: 'bg-ai-blue' }
    };

    // --- Core URL and Share Link Logic ---
    function generateShareableLink(aiName, query, copy) {
        const encodedQuery = encodeURIComponent(query.trim());
        const baseUrl = window.location.origin + window.location.pathname;
        let link = `${baseUrl}?ai=${aiName}&q=${encodedQuery}`;
        if (copy) {
            link += `&copy=true`;
        }
        return link;
    }

    function checkUrlParameters() {
        const params = new URLSearchParams(window.location.search);
        const aiName = params.get('ai');
        const query = params.get('q');
        const autoCopy = params.get('copy') === 'true';

        if (aiName && query) {
            const config = aiConfigs[aiName];
            if (config) {
                currentQuery = decodeURIComponent(query);
                document.getElementById('main-content').classList.add('hidden');
                startAnimation(aiName, currentQuery, config, autoCopy);
                return true;
            }
        }
        return false;
    }

    // --- Modal Button Creation with Icons ---
    function createModalButtons(query) {
        aiButtonsContainer.innerHTML = '';
       
        Object.keys(aiConfigs).forEach(aiName => {
            const config = aiConfigs[aiName];
            const openButtonBaseColor = config.color;
           
            const groupTitle = document.createElement('h3');
            groupTitle.className = 'text-xl font-semibold mt-4 text-gray-700';
            groupTitle.textContent = aiName;
            aiButtonsContainer.appendChild(groupTitle);
           
            const choiceGroup = document.createElement('div');
            choiceGroup.className = 'flex space-x-2 mt-2 mb-4';
           
            // 1. "Open Now" Button with External Link Icon ↗️
            const openButton = document.createElement('button');
            openButton.type = 'button';
            const hoverColor = aiName === 'ChatGPT' ? 'hover:bg-gray-700' :
                               aiName === 'Gemini' ? 'hover:bg-alert-red/90' :
                               'hover:bg-ai-blue/90';
            
            openButton.className = `w-1/2 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md ${openButtonBaseColor} ${hoverColor} focus:ring-4 text-sm flex items-center justify-center space-x-2`;

            // External Link/Launch Icon SVG
            openButton.innerHTML = `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                <span>Open Now</span>
            `;

            openButton.addEventListener('click', () => {
                aiModal.close();
                // REVERT: Copy is now conditional based on AI name for "Open Now"
                const shouldCopy = (aiName !== 'ChatGPT');

                if (shouldCopy) {
                    navigator.clipboard.writeText(currentQuery).then(() => {
                        console.log(`Query copied for "Open Now" user on ${aiName}.`);
                    }).catch(err => {
                        console.error('Could not copy text: ', err);
                    });
                }
                startAnimation(aiName, currentQuery, config, shouldCopy); 
            });
           
            // 2. "Copy Link" Button with Clipboard Icon 📋 (Hover color matches Open button)
            const copyLinkButton = document.createElement('button');
            copyLinkButton.type = 'button';
            
            const copyButtonNewClassName = `
                w-1/2 font-semibold py-3 rounded-lg transition duration-200 text-sm
                text-gray-800 border border-gray-300 bg-gray-100 
                hover:text-white hover:${openButtonBaseColor} hover:border-transparent
                flex items-center justify-center space-x-2
            `;
            copyLinkButton.className = copyButtonNewClassName.replace(/\s\s+/g, ' ').trim();
            
            // Clipboard Icon SVG
            const originalLinkContent = `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <span>Copy Share Link</span>
            `;
            copyLinkButton.innerHTML = originalLinkContent;


            copyLinkButton.addEventListener('click', () => {
                const shareLink = generateShareableLink(aiName, currentQuery, true);
               
                navigator.clipboard.writeText(shareLink).then(() => {
                    // Success feedback
                    copyLinkButton.innerHTML = `<span class="text-white">Link Copied! 🎉</span>`;
                    setTimeout(() => {
                        copyLinkButton.innerHTML = originalLinkContent;
                    }, 2000);
                }).catch(err => {
                    alert("Could not copy link. Please manually copy the URL:\n" + shareLink);
                });
            });

            choiceGroup.appendChild(openButton);
            choiceGroup.appendChild(copyLinkButton);
            aiButtonsContainer.appendChild(choiceGroup);
        });
    }

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        currentQuery = queryInput.value.trim();
       
        if (currentQuery) {
            createModalButtons(currentQuery);
            aiModal.showModal();
        }
    });

    closeModalButton.addEventListener('click', () => aiModal.close());


    // --- Animation and Instructions ---
    function startAnimation(aiName, query, config, copyToClipboard) {
        document.getElementById('main-content').classList.add('hidden');
        animationArea.classList.remove('hidden');
        openAiButtonContainer.innerHTML = '';

        const fullText = `I am asking ${aiName} for the answer to: "${query}"`;
        typedTextElement.textContent = '';
        typingIndicator.style.opacity = '0';
        instructionsElement.innerHTML = `<p class="text-gray-500">Preparing the question and instructions...</p>`;

        let i = 0;
        const speed = 50;
        const encodedQuery = encodeURIComponent(query);
       
        // --- Conditional Copy: ONLY runs if it came from a shared link for non-ChatGPT AIs ---
        if (copyToClipboard && aiName !== 'ChatGPT') {
             navigator.clipboard.writeText(query).then(() => {
                 console.log('Query copied for shared link user.');
             }).catch(err => {
                 console.error('Could not copy text: ', err);
             });
        }
        
        // --- Determine Final Redirect URL and Instructions (REVERTED) ---
        let finalUrl = config.url;
        let clipboardStep;
        let pasteStep;

        if (aiName === 'ChatGPT') {
            finalUrl = `${config.url}?q=${encodedQuery}`;
            clipboardStep = `1. The question **is in the URL**, ready to load.`;
            pasteStep = `3. The question should **appear automatically** in the chat box (may take a moment). If it doesn't, manually copy the text above.`;
        } else {
            finalUrl = config.url;
            clipboardStep = `1. The question is now **copied to your clipboard** (unless the browser denied permission).`;
            pasteStep = `3. Click the chat box, then **PASTE (Ctrl+V / Cmd+V)**.`;
        }


        function typeWriter() {
            if (i < fullText.length) {
                typedTextElement.textContent += fullText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                typingIndicator.style.opacity = '1';
               
                let instructionContent = `
                    <div class="p-4 border-2 border-alert-red rounded-xl bg-red-100/50 text-black shadow-lg">
                        <strong class="text-lg font-extrabold">ATTENTION! Manual Action Required!</strong><br>
                        <p class="mt-2 text-sm text-gray-800 space-y-2">
                            <span>${clipboardStep}</span><br>
                            <span>2. **Click the button below** to open the AI page.</span><br>
                            <span>${pasteStep}</span><br>
                            <span>4. Press **ENTER** or the **SEND** button to submit.</span>
                        </p>
                    </div>
                `;

                instructionsElement.innerHTML = instructionContent;
               
                // 2. Create and insert the final "Go" button
                const goButton = document.createElement('button');
                goButton.type = 'button';
                goButton.textContent = `Open ${aiName} Now`;
                goButton.className = `w-full max-w-xs bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition duration-200 shadow-lg text-xl`;

                goButton.addEventListener('click', () => {
                    window.open(finalUrl, '_blank');
                });
               
                openAiButtonContainer.appendChild(goButton);
            }
        }

        typeWriter();
    }
   
    // --- Initial Page Check ---
    checkUrlParameters();
});
document.addEventListener('DOMContentLoaded', function() {

    // Page Elements
    const pages = {
        page1: document.getElementById('page1'),
        page2: document.getElementById('page2'),
        page3: document.getElementById('page3'),
        mainPage: document.getElementById('mainPage'),
        congratsPage: document.getElementById('congratsPage'),
        theEndPage: document.getElementById('theEndPage')
    };

    // Buttons
    const buttons = {
        goAheadBtn: document.getElementById('goAheadBtn'),
        loveYouTooBtn: document.getElementById('loveYouTooBtn'),
        nextBtn: document.getElementById('nextBtn'),
        saveSignatureBtn: document.getElementById('saveSignatureBtn')
    };
    
    // Other Elements
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const messageElement = document.getElementById('message');
    const proposalSection = document.getElementById('proposalSection');

    let currentMessageIndex = 0;
    
    // --- Updated Messages with Emojis ---
    const messages = [
        { text: "তুই শালা আস্ত একটা কুত্তা... 🐶 (তবে আমার সবচেয়ে আদরের কুত্তা 💖)", btnText: "হাহা! এরপর?" },
        { text: "তাসনিম নামের অর্থ যে 'স্বর্গের ঝর্ণা' এটা জানতিস? কিন্তু আমার কাছে তুই তো টার্কি মুরগি! 🦃😂", btnText: "সিরিয়াসলি? 🤣" },
        { text: "তুই দুনিয়ার ৯ নম্বর অদ্ভুত প্রাণী হওয়ার যোগ্যতা রাখিস! 👽✨", btnText: "আমি অদ্ভুত? দেখ এরপর কী বলিস!" },
        { text: "যত যাই বলি না কেন, সত্যিটা হলো... তুই না থাকলে আমার জীবনে এত রঙ থাকতো না। 🎨❤️", btnText: "আহারে... 🥺" },
        { text: "তোর কারণেই তো আমি কাউকে মনের সুখে গালি দিয়ে মন হালকা করতে পারি! তুই আমার গালি ব্যাংক! 🏦🤬", btnText: "তোর জন্য সবই পারি বন্ধু! 😉" },
        { text: "তুই আসলেই বেস্ট একটা জিনিস ভাই... ✨🫂", btnText: "I know! 😎" },
        { text: "তোর আব্বুকে আমার পক্ষ থেকে একটা স্পেশাল থ্যাংকস বলিস... 💐 উনি তোকে পয়দা না করলে আমি এমন একটা বন্ধু কোথায় পেতাম? 😭🙏", btnText: "আঙ্কেল Rocks! 🤘" },
        { text: "শোন... একদিন রতন অনেক স্ট্যাবল হবে আর সেইদিন তাসনিমকে বিয়ে করে ফেলবে! 😎🙈💍", btnText: "সত্যি বলছিস? 👀" }
    ];

    function showPage(pageId) {
        Object.values(pages).forEach(page => page.classList.add('hidden'));
        pages[pageId].classList.remove('hidden');
    }

    function updateMessage() {
        if (currentMessageIndex < messages.length) {
            messageElement.innerHTML = messages[currentMessageIndex].text;
            buttons.nextBtn.textContent = messages[currentMessageIndex].btnText;
            currentMessageIndex++;
        } else {
            messageElement.classList.add('hidden');
            buttons.nextBtn.classList.add('hidden');
            proposalSection.classList.remove('hidden');
        }
    }

    buttons.goAheadBtn.addEventListener('click', () => {
        showPage('page2');
        setTimeout(() => {
            showPage('page3');
        }, 10000); // 10 seconds timeout
    });

    buttons.loveYouTooBtn.addEventListener('click', () => {
        showPage('mainPage');
        updateMessage();
    });

    buttons.nextBtn.addEventListener('click', () => {
        updateMessage();
    });

    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            showPage('congratsPage');
            resizeCanvas(); // Ensure canvas is resized when the page is shown
        });
    });

    // --- Signature Pad Logic ---
    const canvas = document.getElementById('signature-pad');
    const signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)'
    });

    function resizeCanvas() {
        const ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        signaturePad.clear(); // Resets the signature pad
    }

    // Resize canvas on window resize and initial load
    window.addEventListener("resize", resizeCanvas);
    
    buttons.saveSignatureBtn.addEventListener('click', () => {
        if (signaturePad.isEmpty()) {
            alert("আগে স্বাক্ষর কর, চালাকি করিস না! 😉");
        } else {
            showPage('theEndPage');
        }
    });

    // Initialize the first page
    showPage('page1');
});
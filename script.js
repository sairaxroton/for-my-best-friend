document.addEventListener('DOMContentLoaded', function() { // 'Document' থেকে 'document' করা হয়েছে

    // Page Elements
    const pages = {
        page1: document.getElementById('page1'),
        page2: document.getElementById('page2'),
        page3: document.getElementById('page3'),
        mainPage: document.getElementById('mainPage'),
        congratsPage: document.getElementById('congratsPage'),
        theEndPage: document.getElementById('theEndPage') // Keep this for clarity, though it will now be "eibarja amar Ripley de"
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
    const theEndPageText = document.getElementById('theEndPageText'); // Assuming you have an element to display this text

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
        { text: "শোন... একদিন রতন অনেক স্ট্যাবল হবে আর সেইদিন তাসনিমকে বিয়ে করে ফেলবে! 😎🙈💍", btnText: "সত্যি বলছিস? 👀" },
        // --- New Messages Added Below ---
        { text: "তুই আমার জীবনের সেই বিরল বই, যেটা পড়া শেষ না হলেও বারবার পড়তে ইচ্ছে করে। 📖❤️", btnText: "ফিলোসফি! 🤯" },
        { text: "পৃথিবীর সব চিপা গলিতে তোর সাথে আড্ডা মারার জন্য আমি তৈরি। 🗺️😅", btnText: "চলো যাই! 🚀" },
        { text: "তোর হাসি দেখলে মনে হয় দুনিয়ার সব ঝামেলা এক নিমিষে গায়েব! 😄✨", btnText: "আমার হাসি তো ডায়নামাইট! 💥" },
        { text: "তুই না থাকলে আমার জীবনের মেমেগুলো কে বুঝত? তুই আমার পার্সোনাল মেমে ডিকশনারি! 🤣📚", btnText: "আমিই তো! 💁‍♀️" },
        { text: "কখনো কখনো মনে হয়, তুই না জন্মালে পৃথিবীতে একটা কমিক ক্যারেক্টার কম পড়ত! 🤡😂", btnText: "আমি তো মাল্টি-ট্যালেন্টেড! 🌟" },
        { text: "তোর পাগলামিগুলোই তোকে স্পেশাল বানিয়েছে। তুই আমার জীবনের পাগলা গারদ! 🤪 asylum", btnText: "পাগল! 😜" },
        { text: "একটা কথা বলি, তোর মতো বন্ধু পাওয়া ভাগ্যের ব্যাপার। আমার ভাগ্য ভালো! 🍀🥰", btnText: "আমারো! 🫂" },
        { text: "তোর সাথে ঝগড়া করাটাও এক প্রকার আর্ট, যেটা আমি খুব উপভোগ করি! 🎨😈", btnText: "শিক্ষক আমি! 🧑‍🏫" },
        { text: "আমার জীবনের সবচেয়ে বড় আবিষ্কার তুই! তোর মতো একটা এলিয়েন 👽 ফ্রেন্ড আর কোথায় পাবো?", btnText: "সত্যিই আমি অনন্য! 👑" },
        { text: "তোর সাথে কাটানো প্রতিটা মুহূর্ত যেন এক একটা ছোট ছুটি! 🌴 relax", btnText: "ছুটি চাই! 🏖️" }
    ];

    function showPage(pageId) {
        Object.values(pages).forEach(page => page.classList.add('hidden'));
        // Special handling for the last page text
        if (pageId === 'theEndPage' && theEndPageText) {
            theEndPageText.innerHTML = "এইবার আমার মেসেজ এর রিপ্লাই দে গিয়ে যাহ";
            pages[pageId].classList.remove('hidden');
        } else if (pages[pageId]) {
            pages[pageId].classList.remove('hidden');
        }
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
        }, 5000); // 5 seconds timeout (changed from 10s as per original code)
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
    // নিশ্চিত করুন যে SignaturePad লাইব্রেরি লোড হয়েছে
    if (typeof SignaturePad === 'undefined') {
        console.error("SignaturePad library is not loaded. Please include it in your HTML.");
        // এখানে আপনি একটি ফলব্যাক বা ইউজারকে বার্তা দেখাতে পারেন
        alert("স্বাক্ষর প্যাড লোড হতে পারেনি। অনুগ্রহ করে পেজটি রিফ্রেশ করুন অথবা আপনার ওয়েবসাইটের অ্যাডমিনকে জানান।");
        return; // লাইব্রেরি না থাকলে আর কোড রান করার দরকার নেই
    }
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
            showPage('theEndPage'); // Changed from 'eibarja amar Ripley de' to 'theEndPage'
        }
    });

    // Initialize the first page
    showPage('page1');
});

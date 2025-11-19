// Anubis Tarih Araştırması Kısa Oyunu
(function() {
    'use strict';
    
    const quizData = [
        {
            question: "Anubis'in en belirgin sembolü nedir?",
            answers: [
                { text: "Şakal başı", correct: true },
                { text: "Aslan başı", correct: false },
                { text: "Kartal kanatları", correct: false },
                { text: "Yılan kuyruğu", correct: false }
            ],
            explanation: "Anubis, şakal başlı bir tanrı olarak tasvir edilir. Şakallar, mezarlıkları koruma alışkanlıkları nedeniyle ölüm ve ölüm sonrası yaşamla ilişkilendirilmiştir."
        },
        {
            question: "Anubis'in ana görevi nedir?",
            answers: [
                { text: "Güneş tanrısı olmak", correct: false },
                { text: "Ölülerin rehberi ve koruyucusu olmak", correct: true },
                { text: "Savaş tanrısı olmak", correct: false },
                { text: "Bereket tanrısı olmak", correct: false }
            ],
            explanation: "Anubis, ölülerin ruhlarını Duat'a (ölüler dünyası) güvenli bir şekilde rehberlik eden ve koruyan tanrıdır."
        },
        {
            question: "Kalbin tartılması ritüelinde Anubis'in rolü nedir?",
            answers: [
                { text: "Teraziyi yönetmek ve adaleti sağlamak", correct: true },
                { text: "Kalbi yemek", correct: false },
                { text: "Ruhu yargılamak", correct: false },
                { text: "Mumyalama yapmak", correct: false }
            ],
            explanation: "Anubis, ölülerin kalplerini Maat'ın tüyü ile tartarak adaleti sağlar. Bu kutsal ritüel, ruhun ölüm sonrası yaşama geçişinde kritik bir rol oynar."
        },
        {
            question: "Anubis'in siyah rengi neyi simgeler?",
            answers: [
                { text: "Ölüm ve karanlık", correct: false },
                { text: "Nil'in verimli çamuru ve yeniden doğuş", correct: true },
                { text: "Gece ve uyku", correct: false },
                { text: "Kötülük ve şeytan", correct: false }
            ],
            explanation: "Anubis'in siyah rengi, ölümü değil, Nil'in verimli çamurunu ve yeniden doğuşu simgeler. Bu renk, yaşam döngüsünün sürekliliğini temsil eder."
        },
        {
            question: "Anubis kültünün kökenleri nereye dayanır?",
            answers: [
                { text: "Yunan mitolojisi", correct: false },
                { text: "Roma İmparatorluğu", correct: false },
                { text: "Antik Mısır'ın en eski dönemleri", correct: true },
                { text: "Mezopotamya", correct: false }
            ],
            explanation: "Anubis kültünün kökenleri, antik Mısır'ın en eski dönemlerine kadar uzanır. Şakallar, çöl nekropollerinin doğal bekçileri olarak görülürdü."
        },
        {
            question: "Anubis'in tasvirlerindeki altın detaylar neyi vurgular?",
            answers: [
                { text: "Zenginliği", correct: false },
                { text: "İlahi doğasını ve tanrısal gücünü", correct: true },
                { text: "Güneşi", correct: false },
                { text: "Kraliyet ailesini", correct: false }
            ],
            explanation: "Anubis tasvirlerindeki altın detaylar, onun ilahi doğasını ve tanrısal gücünü vurgular. Altın, antik Mısır'da tanrısal özelliklerle ilişkilendirilirdi."
        },
        {
            question: "Duat nedir?",
            answers: [
                { text: "Güneş tanrısı", correct: false },
                { text: "Ölüler dünyası", correct: true },
                { text: "Yaşam tanrısı", correct: false },
                { text: "Bir tapınak adı", correct: false }
            ],
            explanation: "Duat, antik Mısır mitolojisinde ölüler dünyasıdır. Anubis, ölülerin ruhlarını bu dünyaya güvenli bir şekilde rehberlik eder."
        },
        {
            question: "Anubis'in şakal başlı tasviri neden ortaya çıkmıştır?",
            answers: [
                { text: "Şakalların gücünden korkulması", correct: false },
                { text: "Şakalların mezarlıkları koruma alışkanlığı", correct: true },
                { text: "Şakalların kutsal sayılması", correct: false },
                { text: "Rastgele bir seçim", correct: false }
            ],
            explanation: "Anubis'in şakal başlı tasviri, bu hayvanların mezarlıkları koruma alışkanlığından kaynaklanır. Antik Mısırlılar, şakalların ölüleri koruduğuna inanırlardı."
        },
        {
            question: "Anubis'in Mısır mitolojisindeki diğer adı nedir?",
            answers: [
                { text: "Anpu", correct: true },
                { text: "Osiris", correct: false },
                { text: "Horus", correct: false },
                { text: "Ra", correct: false }
            ],
            explanation: "Anubis'in hiyeroglif yazıdaki adı 'Anpu' olarak yazılır. Bu isim, onun antik Mısır'daki orijinal adıdır."
        },
        {
            question: "Anubis'in en çok hangi şehirde tapınılırdı?",
            answers: [
                { text: "Memphis", correct: false },
                { text: "Sakkara ve Cynopolis", correct: true },
                { text: "Thebes", correct: false },
                { text: "Alexandria", correct: false }
            ],
            explanation: "Anubis'e özellikle Sakkara nekropolünde ve Cynopolis (Köpek Şehri) şehrinde tapınılırdı. Bu şehirler, Anubis kültünün merkezleriydi."
        },
        {
            question: "Anubis'in kalbin tartılması ritüelindeki terazide karşılaştırılan şey nedir?",
            answers: [
                { text: "Kalp ve altın", correct: false },
                { text: "Kalp ve Maat'ın tüyü", correct: true },
                { text: "Kalp ve taş", correct: false },
                { text: "Kalp ve su", correct: false }
            ],
            explanation: "Anubis, ölülerin kalplerini Maat'ın (adalet ve doğruluk tanrıçası) tüyü ile tartar. Eğer kalp tüyden hafifse, ruh ölüm sonrası yaşama geçebilir."
        },
        {
            question: "Anubis'in babası olarak kabul edilen tanrı kimdir?",
            answers: [
                { text: "Osiris", correct: true },
                { text: "Ra", correct: false },
                { text: "Set", correct: false },
                { text: "Horus", correct: false }
            ],
            explanation: "Farklı mitolojik versiyonlarda Anubis'in babası olarak Osiris gösterilir. Bazı kaynaklarda ise Re veya Set olarak da geçer."
        },
        {
            question: "Anubis'in mumyalama sürecindeki rolü nedir?",
            answers: [
                { text: "Sadece gözlemci olmak", correct: false },
                { text: "Mumyalama işlemini yönetmek ve korumak", correct: true },
                { text: "Sadece tören yapmak", correct: false },
                { text: "Hiçbir rolü yok", correct: false }
            ],
            explanation: "Anubis, mumyalama sürecinin koruyucusu ve yöneticisidir. Antik Mısır'da mumyalama ritüellerinde Anubis'in rehberliği aranırdı."
        },
        {
            question: "Anubis'in tasvirlerinde genellikle hangi renk kullanılır?",
            answers: [
                { text: "Beyaz", correct: false },
                { text: "Siyah", correct: true },
                { text: "Kırmızı", correct: false },
                { text: "Mavi", correct: false }
            ],
            explanation: "Anubis genellikle siyah renkte tasvir edilir. Bu renk, Nil'in verimli çamurunu ve yeniden doğuşu simgeler, ölümü değil."
        },
        {
            question: "Anubis'in Yunan mitolojisindeki karşılığı kimdir?",
            answers: [
                { text: "Zeus", correct: false },
                { text: "Hermes", correct: true },
                { text: "Hades", correct: false },
                { text: "Apollo", correct: false }
            ],
            explanation: "Yunanlılar Anubis'i Hermes ile özdeşleştirmişlerdir. Her ikisi de ölülerin rehberi ve geçitlerin bekçisi olarak görülürdü."
        },
        {
            question: "Anubis'in sembolize ettiği ana kavramlar nelerdir?",
            answers: [
                { text: "Sadece ölüm", correct: false },
                { text: "Koruma, rehberlik ve adalet", correct: true },
                { text: "Sadece savaş", correct: false },
                { text: "Sadece bereket", correct: false }
            ],
            explanation: "Anubis, koruma, rehberlik ve adalet kavramlarını sembolize eder. Ölüleri korur, onlara rehberlik eder ve adaleti sağlar."
        },
        {
            question: "Anubis'in tapınaklarında hangi hayvanlar kutsal sayılırdı?",
            answers: [
                { text: "Kediler", correct: false },
                { text: "Şakallar ve köpekler", correct: true },
                { text: "Yılanlar", correct: false },
                { text: "Aslanlar", correct: false }
            ],
            explanation: "Anubis'in tapınaklarında şakallar ve köpekler kutsal sayılırdı. Bu hayvanlar mumyalanır ve özel mezarlara gömülürdü."
        },
        {
            question: "Anubis'in 'Kalbin Tartılması' sahnesinde kim yanında durur?",
            answers: [
                { text: "Sadece Osiris", correct: false },
                { text: "Thoth ve Ammit", correct: true },
                { text: "Sadece Ra", correct: false },
                { text: "Sadece Horus", correct: false }
            ],
            explanation: "Kalbin tartılması sahnesinde Anubis teraziyi yönetirken, Thoth sonuçları kaydeder ve Ammit (kalp yiyen canavar) hazır bekler."
        },
        {
            question: "Anubis'in antik Mısır sanatında en yaygın pozisyonu nedir?",
            answers: [
                { text: "Ayakta duran insan", correct: false },
                { text: "Şakal başlı, çömelmiş veya ayakta duran figür", correct: true },
                { text: "Uçan figür", correct: false },
                { text: "Oturan figür", correct: false }
            ],
            explanation: "Anubis genellikle şakal başlı, çömelmiş veya ayakta duran bir figür olarak tasvir edilir. Bu pozisyonlar onun koruyucu ve rehberlik eden rolünü vurgular."
        },
        {
            question: "Anubis'in hangi dönemde en popüler olduğu düşünülür?",
            answers: [
                { text: "Yeni Krallık dönemi", correct: false },
                { text: "Eski ve Orta Krallık dönemleri", correct: true },
                { text: "Ptolemaios dönemi", correct: false },
                { text: "Roma dönemi", correct: false }
            ],
            explanation: "Anubis kültü özellikle Eski ve Orta Krallık dönemlerinde çok popülerdi. Bu dönemlerde ölülerin koruyucusu olarak büyük saygı görürdü."
        },
        {
            question: "Anubis'in 'İmıut' adlı sembolü neyi temsil eder?",
            answers: [
                { text: "Güneş", correct: false },
                { text: "Mumyalanmış şakal derisi", correct: true },
                { text: "Terazi", correct: false },
                { text: "Asa", correct: false }
            ],
            explanation: "İmıut, mumyalanmış şakal derisini temsil eden bir semboldür ve Anubis ile ilişkilendirilir. Bu sembol koruma ve ölüm sonrası yaşamı simgeler."
        },
        {
            question: "Anubis'in Yeni Krallık döneminde rolü nasıl değişti?",
            answers: [
                { text: "Tamamen unutuldu", correct: false },
                { text: "Osiris'in rolü arttı, Anubis'in rolü azaldı ama önemini korudu", correct: true },
                { text: "Daha da önemli hale geldi", correct: false },
                { text: "Hiç değişmedi", correct: false }
            ],
            explanation: "Yeni Krallık döneminde Osiris'in popülaritesi arttı ve Anubis'in rolü biraz azaldı, ancak o hala önemli bir tanrı olarak kaldı ve mumyalama ritüellerinde kritik rol oynadı."
        }
    ];
    
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;
    
    let quizStartScreen, quizGameScreen, quizResultsScreen;
    let quizStartBtn, quizNextBtn, quizRestartBtn;
    let questionText, answersContainer, quizFeedback, feedbackContent;
    let quizProgress, currentQuestionSpan, quizScoreSpan, finalScoreSpan;
    let resultsMessage, resultsIcon, resultsTitle, maxScoreSpan;
    
    function initQuiz() {
        // Get all elements
        quizStartScreen = document.getElementById('quizStartScreen');
        quizGameScreen = document.getElementById('quizGameScreen');
        quizResultsScreen = document.getElementById('quizResultsScreen');
        quizStartBtn = document.getElementById('quizStartBtn');
        quizNextBtn = document.getElementById('quizNextBtn');
        quizRestartBtn = document.getElementById('quizRestartBtn');
        questionText = document.getElementById('questionText');
        answersContainer = document.getElementById('answersContainer');
        quizFeedback = document.getElementById('quizFeedback');
        feedbackContent = document.getElementById('feedbackContent');
        quizProgress = document.getElementById('quizProgress');
        currentQuestionSpan = document.getElementById('currentQuestion');
        quizScoreSpan = document.getElementById('quizScore');
        finalScoreSpan = document.getElementById('finalScore');
        resultsMessage = document.getElementById('resultsMessage');
        resultsIcon = document.getElementById('resultsIcon');
        resultsTitle = document.getElementById('resultsTitle');
        maxScoreSpan = document.getElementById('maxScore');
        
        if (!quizStartBtn) {
            console.error('Quiz start button not found!');
            return;
        }
        
        // Add event listeners
        quizStartBtn.addEventListener('click', startQuiz);
        if (quizNextBtn) {
            quizNextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (quizNextBtn.textContent === 'Sonuçları Gör') {
                    showResults();
                } else {
                    nextQuestion();
                }
            });
        }
        if (quizRestartBtn) {
            quizRestartBtn.addEventListener('click', restartQuiz);
        }
        
        console.log('Quiz initialized successfully');
    }
    
    function startQuiz(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;
        
        if (quizStartScreen) quizStartScreen.style.display = 'none';
        if (quizGameScreen) quizGameScreen.style.display = 'block';
        if (quizResultsScreen) quizResultsScreen.style.display = 'none';
        
        if (quizScoreSpan) quizScoreSpan.textContent = '0';
        
        showQuestion();
    }
    
    function showQuestion() {
        const question = quizData[currentQuestionIndex];
        if (!question || !questionText || !answersContainer) return;
        
        questionText.textContent = question.question;
        answersContainer.innerHTML = '';
        if (quizFeedback) quizFeedback.style.display = 'none';
        if (quizNextBtn) quizNextBtn.style.display = 'none';
        selectedAnswer = null;
        
        // Shuffle answers
        const shuffledAnswers = [...question.answers].sort(() => Math.random() - 0.5);
        
        shuffledAnswers.forEach((answer, index) => {
            const answerBtn = document.createElement('button');
            answerBtn.className = 'answer-btn';
            answerBtn.textContent = answer.text;
            answerBtn.dataset.correct = answer.correct;
            answerBtn.addEventListener('click', () => selectAnswer(answerBtn, answer));
            answersContainer.appendChild(answerBtn);
        });
        
        updateProgress();
    }
    
    function selectAnswer(button, answer) {
        if (selectedAnswer !== null) return;
        
        selectedAnswer = answer;
        const allButtons = answersContainer.querySelectorAll('.answer-btn');
        allButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            } else if (btn === button && answer.correct === false) {
                btn.classList.add('incorrect');
            }
        });
        
        if (answer.correct) {
            score++;
            if (quizScoreSpan) quizScoreSpan.textContent = score;
        }
        
        showFeedback(answer);
    }
    
    function showFeedback(answer) {
        const question = quizData[currentQuestionIndex];
        const isCorrect = answer.correct;
        
        if (!feedbackContent) return;
        
        feedbackContent.innerHTML = `
            <div class="feedback-icon">${isCorrect ? '✓' : '✗'}</div>
            <p class="feedback-text ${isCorrect ? 'correct' : 'incorrect'}">
                ${isCorrect ? 'Doğru!' : 'Yanlış!'}
            </p>
            <p class="feedback-explanation">${question.explanation}</p>
        `;
        
        if (quizFeedback) {
            quizFeedback.style.display = 'block';
        }
        
        if (quizNextBtn) {
            if (currentQuestionIndex < quizData.length - 1) {
                quizNextBtn.textContent = 'Sonraki Soru';
                quizNextBtn.style.display = 'block';
            } else {
                quizNextBtn.textContent = 'Sonuçları Gör';
                quizNextBtn.style.display = 'block';
            }
        }
    }
    
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }
    
    function showResults() {
        if (quizGameScreen) quizGameScreen.style.display = 'none';
        if (quizResultsScreen) quizResultsScreen.style.display = 'block';
        
        if (finalScoreSpan) finalScoreSpan.textContent = score;
        if (maxScoreSpan) {
            maxScoreSpan.textContent = quizData.length;
        }
        
        const percentage = (score / quizData.length) * 100;
        
        if (percentage === 100) {
            if (resultsIcon) resultsIcon.textContent = '👑';
            if (resultsTitle) resultsTitle.textContent = 'Mükemmel!';
            if (resultsMessage) resultsMessage.textContent = 'Anubis hakkında gerçek bir uzmansınız! Tüm soruları doğru cevapladınız.';
        } else if (percentage >= 75) {
            if (resultsIcon) resultsIcon.textContent = '🏆';
            if (resultsTitle) resultsTitle.textContent = 'Harika!';
            if (resultsMessage) resultsMessage.textContent = 'Anubis hakkında çok iyi bilgiye sahipsiniz!';
        } else if (percentage >= 50) {
            if (resultsIcon) resultsIcon.textContent = '⭐';
            if (resultsTitle) resultsTitle.textContent = 'İyi!';
            if (resultsMessage) resultsMessage.textContent = 'Anubis hakkında iyi bir bilgiye sahipsiniz, ancak daha fazla öğrenebilirsiniz.';
        } else {
            if (resultsIcon) resultsIcon.textContent = '📚';
            if (resultsTitle) resultsTitle.textContent = 'Devam Edin!';
            if (resultsMessage) resultsMessage.textContent = 'Anubis hakkında daha fazla bilgi edinmek için sayfalarımızı keşfedin!';
        }
    }
    
    function restartQuiz() {
        startQuiz();
    }
    
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
        if (quizProgress) quizProgress.style.width = progress + '%';
        if (currentQuestionSpan) currentQuestionSpan.textContent = currentQuestionIndex + 1;
    }
    
    // Auto-start game when page loads
    function autoStartGame() {
        // Initialize quiz first
        initQuiz();
        
        // Then start the game automatically
        setTimeout(function() {
            startQuiz();
        }, 100);
    }
    
    // Initialize when DOM is ready
    function tryInitQuiz() {
        const testElement = document.getElementById('quizGameScreen');
        if (testElement) {
            autoStartGame();
            return true;
        }
        return false;
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                if (!tryInitQuiz()) {
                    setTimeout(tryInitQuiz, 200);
                }
            }, 100);
        });
    } else {
        setTimeout(function() {
            if (!tryInitQuiz()) {
                setTimeout(tryInitQuiz, 200);
            }
        }, 100);
    }
    
    // Also try on window load as backup
    window.addEventListener('load', function() {
        setTimeout(function() {
            const testElement = document.getElementById('quizGameScreen');
            if (testElement) {
                console.log('Auto-starting quiz on window load...');
                autoStartGame();
            }
        }, 300);
    });
})();


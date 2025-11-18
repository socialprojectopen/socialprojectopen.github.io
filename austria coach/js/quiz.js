/**
 * Quiz JavaScript
 * Тестирование знаний по IT
 */

(function() {
    'use strict';

    // Вопросы для теста (расширенная версия)
    const quizQuestions = [
        // DevOps & Cloud
        {
            question: "Was ist der Hauptunterschied zwischen Docker und Virtual Machines?",
            answers: [
                "Docker verwendet Hardware-Virtualisierung, VMs nutzen Container",
                "Docker teilt sich den Kernel des Host-Systems, VMs haben eigene Kernel",
                "Es gibt keinen Unterschied",
                "Docker ist nur für Linux, VMs für alle Betriebssysteme"
            ],
            correct: 1,
            category: "DevOps & Cloud",
            difficulty: "medium"
        },
        {
            question: "Welcher Kubernetes-Befehl wird verwendet, um Pods zu skalieren?",
            answers: [
                "kubectl scale",
                "kubectl resize",
                "kubectl grow",
                "kubectl expand"
            ],
            correct: 0,
            category: "DevOps & Cloud",
            difficulty: "hard"
        },
        {
            question: "Was ist CI/CD?",
            answers: [
                "Continuous Integration / Continuous Deployment",
                "Computer Interface / Code Development",
                "Centralized Integration / Centralized Deployment",
                "Cloud Infrastructure / Cloud Development"
            ],
            correct: 0,
            category: "DevOps & Cloud",
            difficulty: "medium"
        },
        {
            question: "Welche Cloud-Service-Modelle gibt es?",
            answers: [
                "IaaS, PaaS, SaaS",
                "HTTP, HTTPS, FTP",
                "TCP, UDP, IP",
                "HTML, CSS, JavaScript"
            ],
            correct: 0,
            category: "DevOps & Cloud",
            difficulty: "medium"
        },
        
        // Programming & Algorithms
        {
            question: "Was ist die Zeitkomplexität von Binary Search?",
            answers: [
                "O(n)",
                "O(log n)",
                "O(n log n)",
                "O(n²)"
            ],
            correct: 1,
            category: "Programming & Algorithms",
            difficulty: "hard"
        },
        {
            question: "Was ist der Unterschied zwischen 'let' und 'var' in JavaScript?",
            answers: [
                "'let' hat Block-Scope, 'var' hat Function-Scope",
                "Es gibt keinen Unterschied",
                "'var' ist neuer als 'let'",
                "'let' kann nur einmal deklariert werden"
            ],
            correct: 0,
            category: "Programming & Algorithms",
            difficulty: "medium"
        },
        {
            question: "Was ist ein Design Pattern?",
            answers: [
                "Eine wiederkehrende Lösung für ein häufig auftretendes Problem",
                "Ein CSS-Stil",
                "Ein Datenbankmodell",
                "Ein Netzwerkprotokoll"
            ],
            correct: 0,
            category: "Programming & Algorithms",
            difficulty: "medium"
        },
        {
            question: "Welche Datenstruktur verwendet FIFO-Prinzip?",
            answers: [
                "Stack",
                "Queue",
                "Tree",
                "Graph"
            ],
            correct: 1,
            category: "Programming & Algorithms",
            difficulty: "easy"
        },
        {
            question: "Was ist der Unterschied zwischen '==' und '===' in JavaScript?",
            answers: [
                "'==' vergleicht nur Werte, '===' vergleicht Werte und Typen",
                "'===' ist veraltet",
                "Es gibt keinen Unterschied",
                "'==' ist schneller"
            ],
            correct: 0,
            category: "Programming & Algorithms",
            difficulty: "medium"
        },
        
        // Web Development
        {
            question: "Was ist der Unterschied zwischen React State und Props?",
            answers: [
                "State ist intern und veränderbar, Props sind extern und unveränderlich",
                "Es gibt keinen Unterschied",
                "Props sind nur für Funktionen, State nur für Klassen",
                "State ist asynchron, Props synchron"
            ],
            correct: 0,
            category: "Web Development",
            difficulty: "hard"
        },
        {
            question: "Was ist CORS?",
            answers: [
                "Cross-Origin Resource Sharing",
                "Centralized Object Resource System",
                "Computer Operating Resource Service",
                "Cloud Object Resource Storage"
            ],
            correct: 0,
            category: "Web Development",
            difficulty: "medium"
        },
        {
            question: "Welche HTTP-Methode wird für das Erstellen neuer Ressourcen verwendet?",
            answers: [
                "GET",
                "POST",
                "PUT",
                "DELETE"
            ],
            correct: 1,
            category: "Web Development",
            difficulty: "easy"
        },
        {
            question: "Was ist der Unterschied zwischen SQL und NoSQL?",
            answers: [
                "SQL ist relational, NoSQL ist nicht-relational",
                "SQL ist nur für MySQL",
                "NoSQL ist veraltet",
                "Es gibt keinen Unterschied"
            ],
            correct: 0,
            category: "Web Development",
            difficulty: "medium"
        },
        
        // Security & Networking
        {
            question: "Was ist der Unterschied zwischen Symmetrischer und Asymmetrischer Verschlüsselung?",
            answers: [
                "Symmetrisch: ein Schlüssel, Asymmetrisch: zwei Schlüssel (öffentlich/privat)",
                "Es gibt keinen Unterschied",
                "Symmetrisch ist schneller, Asymmetrisch sicherer",
                "Beide verwenden denselben Schlüssel"
            ],
            correct: 0,
            category: "Security & Networking",
            difficulty: "hard"
        },
        {
            question: "Was ist ein SQL-Injection-Angriff?",
            answers: [
                "Einschleusen von bösartigem SQL-Code in Datenbankabfragen",
                "Ein Datenbankfehler",
                "Ein Netzwerkprotokoll",
                "Eine Verschlüsselungsmethode"
            ],
            correct: 0,
            category: "Security & Networking",
            difficulty: "medium"
        },
        {
            question: "Welcher Port wird standardmäßig für HTTPS verwendet?",
            answers: [
                "80",
                "443",
                "8080",
                "21"
            ],
            correct: 1,
            category: "Security & Networking",
            difficulty: "easy"
        },
        {
            question: "Was ist OAuth?",
            answers: [
                "Ein Authentifizierungsprotokoll",
                "Eine Programmiersprache",
                "Ein Datenbankmodell",
                "Ein Verschlüsselungsalgorithmus"
            ],
            correct: 0,
            category: "Security & Networking",
            difficulty: "hard"
        },
        
        // Data Science & AI
        {
            question: "Was ist der Unterschied zwischen Machine Learning und Deep Learning?",
            answers: [
                "Deep Learning ist eine Teilmenge von ML, die neuronale Netze mit mehreren Schichten verwendet",
                "Es gibt keinen Unterschied",
                "Machine Learning ist veraltet",
                "Deep Learning ist einfacher"
            ],
            correct: 0,
            category: "Data Science & AI",
            difficulty: "hard"
        },
        {
            question: "Welche Bibliothek wird hauptsächlich für Machine Learning in Python verwendet?",
            answers: [
                "NumPy",
                "Pandas",
                "Scikit-learn",
                "Matplotlib"
            ],
            correct: 2,
            category: "Data Science & AI",
            difficulty: "medium"
        },
        {
            question: "Was ist Overfitting in Machine Learning?",
            answers: [
                "Ein Modell, das zu gut auf Trainingsdaten passt und schlecht auf neue Daten generalisiert",
                "Ein Modell, das zu einfach ist",
                "Ein Datenbankfehler",
                "Ein Netzwerkproblem"
            ],
            correct: 0,
            category: "Data Science & AI",
            difficulty: "hard"
        },
        
        // System Design & Architecture
        {
            question: "Was ist Microservices-Architektur?",
            answers: [
                "Ein Architekturstil, bei dem Anwendungen als Sammlung kleiner, unabhängiger Services entwickelt werden",
                "Ein Datenbankmodell",
                "Ein Verschlüsselungsverfahren",
                "Ein Netzwerkprotokoll"
            ],
            correct: 0,
            category: "System Design & Architecture",
            difficulty: "medium"
        },
        {
            question: "Was ist der Unterschied zwischen horizontalem und vertikalem Scaling?",
            answers: [
                "Horizontal: mehr Server hinzufügen, Vertikal: mehr Ressourcen zu einem Server",
                "Es gibt keinen Unterschied",
                "Horizontal ist veraltet",
                "Vertikal ist immer besser"
            ],
            correct: 0,
            category: "System Design & Architecture",
            difficulty: "medium"
        },
        {
            question: "Was ist ein Load Balancer?",
            answers: [
                "Ein Gerät, das Netzwerkverkehr auf mehrere Server verteilt",
                "Eine Datenbank",
                "Ein Verschlüsselungsalgorithmus",
                "Ein Programmiersprachen-Framework"
            ],
            correct: 0,
            category: "System Design & Architecture",
            difficulty: "medium"
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];
    let startTime = null;
    let timeSpent = 0;
    let categoryScores = {};
    let difficultyScores = { easy: 0, medium: 0, hard: 0 };
    let difficultyCounts = { easy: 0, medium: 0, hard: 0 };

    // Инициализация теста
    function initQuiz() {
        const startBtn = document.getElementById('start-quiz');
        const restartBtn = document.getElementById('restart-quiz');

        if (startBtn) {
            startBtn.addEventListener('click', startQuiz);
        }

        if (restartBtn) {
            restartBtn.addEventListener('click', restartQuiz);
        }
    }

    // Начало теста
    function startQuiz() {
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        startTime = Date.now();
        timeSpent = 0;
        categoryScores = {};
        difficultyScores = { easy: 0, medium: 0, hard: 0 };
        difficultyCounts = { easy: 0, medium: 0, hard: 0 };

        // Перемешать вопросы
        shuffleArray(quizQuestions);

        document.getElementById('quiz-start').style.display = 'none';
        document.getElementById('quiz-questions').style.display = 'block';
        document.getElementById('quiz-results').style.display = 'none';

        showQuestion();
    }

    // Перемешать массив
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Показать вопрос
    function showQuestion() {
        const question = quizQuestions[currentQuestion];
        const container = document.getElementById('question-container');
        
        // Обновить прогресс
        const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        document.getElementById('progress-text').textContent = `Frage ${currentQuestion + 1} von ${quizQuestions.length} | ${question.category} | ${question.difficulty === 'easy' ? 'Einfach' : question.difficulty === 'medium' ? 'Mittel' : 'Schwer'}`;

        // Создать HTML для вопроса
        const difficultyBadge = question.difficulty === 'easy' ? '<span class="difficulty-badge easy">Einfach</span>' : 
                               question.difficulty === 'medium' ? '<span class="difficulty-badge medium">Mittel</span>' : 
                               '<span class="difficulty-badge hard">Schwer</span>';
        
        let html = `
            <div class="question-card card" style="margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span class="category-badge">${question.category}</span>
                    ${difficultyBadge}
                </div>
                <h3 style="color: var(--text-light); margin-bottom: 1.5rem; font-size: 1.3rem;">${question.question}</h3>
                <div class="quiz-answers">
        `;

        question.answers.forEach((answer, index) => {
            html += `
                <label class="quiz-answer-option">
                    <input type="radio" name="answer" value="${index}" style="margin-right: 0.5rem;">
                    <span>${answer}</span>
                </label>
            `;
        });

        html += `
                </div>
                <button id="next-question" class="btn" style="margin-top: 2rem; width: 100%;" disabled>Weiter</button>
            </div>
        `;

        container.innerHTML = html;

        // Добавить обработчики событий
        const radioButtons = container.querySelectorAll('input[type="radio"]');
        const nextBtn = document.getElementById('next-question');
        const answerOptions = container.querySelectorAll('.quiz-answer-option');

        radioButtons.forEach((radio, index) => {
            radio.addEventListener('change', function() {
                // Убрать выделение со всех опций
                answerOptions.forEach(option => {
                    option.style.backgroundColor = '';
                    option.style.borderColor = '';
                });
                
                // Выделить выбранную опцию
                const selectedOption = answerOptions[index];
                selectedOption.style.backgroundColor = 'rgba(255, 140, 66, 0.2)';
                selectedOption.style.borderColor = 'var(--accent-orange)';
                
                // Активировать кнопку с ярким стилем
                nextBtn.disabled = false;
                nextBtn.style.background = 'linear-gradient(135deg, #ff8c42, #ff6b1a)';
                nextBtn.style.color = '#ffffff';
                nextBtn.style.fontWeight = '700';
                nextBtn.style.boxShadow = '0 4px 20px rgba(255, 140, 66, 0.6)';
                nextBtn.style.border = '2px solid rgba(255, 255, 255, 0.3)';
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            });
        });

        nextBtn.addEventListener('click', nextQuestion);
    }

    // Следующий вопрос
    function nextQuestion() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        
        if (!selectedAnswer) {
            return;
        }

        const answerIndex = parseInt(selectedAnswer.value);
        const question = quizQuestions[currentQuestion];
        userAnswers.push(answerIndex);

        // Подсчет по категориям и сложности
        if (!categoryScores[question.category]) {
            categoryScores[question.category] = { correct: 0, total: 0 };
        }
        categoryScores[question.category].total++;
        
        difficultyCounts[question.difficulty]++;

        if (answerIndex === question.correct) {
            score++;
            categoryScores[question.category].correct++;
            difficultyScores[question.difficulty]++;
        }

        currentQuestion++;

        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    // Показать результаты
    function showResults() {
        timeSpent = Math.round((Date.now() - startTime) / 1000);
        const minutes = Math.floor(timeSpent / 60);
        const seconds = timeSpent % 60;

        document.getElementById('quiz-questions').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'block';

        const percentage = Math.round((score / quizQuestions.length) * 100);
        const resultPercentage = document.getElementById('result-percentage');
        const resultLevel = document.getElementById('result-level');
        const resultDescription = document.getElementById('result-description');

        // Анимация процентов
        animateValue(resultPercentage, 0, percentage, 1000);

        // Определить уровень
        let level, description, color;
        
        if (percentage >= 90) {
            level = "Experte";
            description = "Ausgezeichnet! Sie verfügen über umfangreiches IT-Wissen und sind auf Expertenniveau. Ihre Kenntnisse sind sehr fundiert und Sie können komplexe IT-Herausforderungen meistern.";
            color = "#4CAF50";
        } else if (percentage >= 70) {
            level = "Fortgeschritten";
            description = "Sehr gut! Sie haben solide IT-Kenntnisse auf fortgeschrittenem Niveau. Mit etwas zusätzlichem Training können Sie Ihr Wissen weiter ausbauen.";
            color = "#8BC34A";
        } else if (percentage >= 50) {
            level = "Mittelstufe";
            description = "Gut! Sie haben grundlegende IT-Kenntnisse. Es gibt noch Raum für Verbesserungen. Wir empfehlen Ihnen, unsere Kurse zu besuchen, um Ihr Wissen zu erweitern.";
            color = "#FFC107";
        } else {
            level = "Anfänger";
            description = "Sie befinden sich auf Anfängerniveau. Keine Sorge - jeder fängt einmal an! Unsere Kurse helfen Ihnen, Ihre IT-Kenntnisse systematisch aufzubauen und zu verbessern.";
            color = "#FF9800";
        }

        resultLevel.textContent = level;
        resultLevel.style.color = color;
        resultPercentage.style.color = color;
        
        // Детальное описание с аналитикой
        let detailedDescription = description;
        detailedDescription += `<br><br><strong style="color: var(--text-light);">Detaillierte Auswertung:</strong><br>`;
        detailedDescription += `Zeit: ${minutes} Min ${seconds} Sek<br>`;
        detailedDescription += `Richtige Antworten: ${score} von ${quizQuestions.length}<br><br>`;
        
        // Результаты по категориям
        detailedDescription += `<strong style="color: var(--accent-orange);">Nach Kategorien:</strong><br>`;
        for (const [category, data] of Object.entries(categoryScores)) {
            const catPercentage = Math.round((data.correct / data.total) * 100);
            detailedDescription += `${category}: ${data.correct}/${data.total} (${catPercentage}%)<br>`;
        }
        
        detailedDescription += `<br><strong style="color: var(--accent-orange);">Nach Schwierigkeit:</strong><br>`;
        for (const [difficulty, count] of Object.entries(difficultyCounts)) {
            if (count > 0) {
                const diffScore = difficultyScores[difficulty];
                const diffPercentage = Math.round((diffScore / count) * 100);
                const diffName = difficulty === 'easy' ? 'Einfach' : difficulty === 'medium' ? 'Mittel' : 'Schwer';
                detailedDescription += `${diffName}: ${diffScore}/${count} (${diffPercentage}%)<br>`;
            }
        }
        
        resultDescription.innerHTML = detailedDescription;
    }

    // Анимация числа
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + "%";
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Перезапуск теста
    function restartQuiz() {
        document.getElementById('quiz-start').style.display = 'block';
        document.getElementById('quiz-questions').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'none';
        
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        startTime = null;
        timeSpent = 0;
        categoryScores = {};
        difficultyScores = { easy: 0, medium: 0, hard: 0 };
        difficultyCounts = { easy: 0, medium: 0, hard: 0 };
    }

    // Инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuiz);
    } else {
        initQuiz();
    }
})();


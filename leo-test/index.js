'use strict';
const ratio = Symbol('rt');
const next = Symbol('next');
const start = Symbol('start');
const restart = Symbol('restart');

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ arr[ i ], arr[ j ] ] = [ arr[ j ], arr[ i ] ];
    }

    return arr;
}

class FinalScreen {
    constructor(score, onBtnClick) {
        const screen = document.createDocumentFragment();

        const scoreNode = document.createElement('h1');
        scoreNode.textContent = `${score} из 10`;

        const restart = document.createElement('button');
        restart.type = 'button';
        restart.textContent = 'Пройти заново';

        restart.addEventListener('click', e => {
            onBtnClick && onBtnClick();
        });

        screen.appendChild(scoreNode);
        screen.appendChild(restart);

        return screen;
    }
}

class QuizAnswer {
    constructor({ answer, ...params }) {
        const { rate, text, hint } = answer;
        this.text = text;
        this.params = params;
        this.hint = hint;

        function getRate() {
            return rate;
        }

        this[ ratio ] = getRate;

        this.init();
    }

    init() {
        this.setNode();
        this.setEvents();
    }

    setEvents() {
        const { onChange } = this.params;
        this.radioNode.addEventListener('change', () => {
            onChange && onChange(this);
        });
    }

    setNode() {
        const idx = this.params.idx;
        const answerWrapperNode = document.createElement('div');
        const answerNode = document.createElement('label');
        const radioNode = document.createElement('input');
        const textNode = document.createTextNode(this.text);
        const hintNode = answerWrapperNode.cloneNode(false);

        answerWrapperNode.className = 'answer';
        hintNode.className = 'answer__hint';
        radioNode.className = 'answer__radio';
        radioNode.type = 'radio';
        radioNode.name = `quiz${idx}`;
        hintNode.textContent = this.hint;

        answerNode.appendChild(radioNode);
        answerNode.appendChild(textNode);
        answerWrapperNode.appendChild(answerNode);

        this.node = answerWrapperNode;
        this.radioNode = radioNode;
        this.hintNode = hintNode;
    }
}

class QuizForm {
    constructor({ questions, idx, isLastStage, onSubmit }) {
        this.onSelectAnswer = this.onSelectAnswer.bind(this);
        this.isLastStage = isLastStage;
        this.title = questions.question;
        this.answers = questions.answers.map(answer => new QuizAnswer({
            answer,
            idx,
            parent: this,
            onChange: this.onSelectAnswer
        }));
        this.onSubmit = onSubmit;
        this.selectedAnswer = null;

        this.init();
    }

    init() {
        this.createFormNode();
        this.setEvents();
    }

    onSelectAnswer(answer) {
        this.selectedAnswer = answer;
        this.submitBtn.disabled = false;

        this.showHints();
    }

    showHints() {
        this.answers.forEach(answer => {
            answer.radioNode.disabled = true;
            answer.node.appendChild(answer.hintNode);
        });
    }

    createFormNode() {
        const formNode = document.createElement('form');
        const submitNode = document.createElement('input');

        submitNode.type = 'submit';
        submitNode.value = this.isLastStage ? 'Показать результаты' : 'Следующий вопрос';
        submitNode.disabled = true;
        formNode.className = 'quiz-form';

        const titleNode = document.createElement('div');
        titleNode.classList.add('quiz__question');
        titleNode.textContent = this.title;

        formNode.appendChild(titleNode);

        this.answers.forEach(answer => {
            formNode.appendChild(answer.node);
        });

        formNode.appendChild(submitNode);

        this.node = formNode;
        this.submitBtn = submitNode;
    }

    setEvents() {
        const onSubmit = this.onSubmit;
        this.node.addEventListener('submit', e => {
            e.preventDefault();
            onSubmit && onSubmit(this.selectedAnswer);
        });
    }
}

class Quiz {
    constructor(params) {
        this.handleSubmit = this.handleSubmit.bind(this);
        this[ restart ] = this[ restart ].bind(this);
        this.defaultStages = params.stages;

        this.rootNode = params.rootNode;
        this.stages = this.prepareQuizStages(params.stages);

        this.currentStageIdx = 0;
        this.totalScore = 0;
    }

    prepareQuizStages(arr) {
        return arr.map((questions, idx, arr) =>
            new QuizForm({
                questions,
                idx,
                isLastStage: idx === arr.length - 1,
                onSubmit: this.handleSubmit
            })
        );
    }

    renderStageNode(stageNode) {
        const rootNode = this.rootNode;
        let child = rootNode.firstChild;
        while (child) {
            rootNode.removeChild(child);
            child = rootNode.firstChild;
        }
        rootNode.appendChild(stageNode);
    }

    handleSubmit(answer) {
        this.totalScore += answer[ ratio ]();
        this[ next ]();
    }

    renderFinalScreen() {
        this.renderStageNode(
            new FinalScreen(this.totalScore, this[ restart ])
        );
    }

    [start]() {
        const stage = this.stages[ this.currentStageIdx ];
        this.renderStageNode(stage.node);
    }

    [next]() {
        const currentStageIdx = this.currentStageIdx;
        const nextStageIdx = currentStageIdx + 1;
        const nextStage = this.stages[ nextStageIdx ];

        if (nextStage) {
            this.renderStageNode(nextStage.node);
            this.currentStageIdx = nextStageIdx;
        } else {
            this.clearData();
            this.renderFinalScreen();
        }
    }

    [restart]() {
        this.currentStageIdx = 0;
        this.stages = this.prepareQuizStages(shuffle(this.defaultStages));

        this[ start ]();
    }

    clearData() {
        delete this.stages;
    }
}

(function () {
    const stages = [
        {
            question: 'dsfasd',
            answers: [
                {
                    text: 'First of 1-st',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 0
                },
                {
                    text: 'Second of 1-st',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 0
                },
                {
                    text: 'Third of 1-st',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 1
                }
            ]
        },
        {
            question: 'asdgmnalsdkmg;lasd',
            answers: [
                {
                    text: 'First of 2-nd',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 0
                },
                {
                    text: 'Second of 2-nd',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 0
                },
                {
                    text: 'Third of 2-nd',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 1
                },
            ]
        },
        {
            question: 'skfdmngalkadfgla',
            answers: [
                {
                    text: '1 3-rd',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 1
                },
                {
                    text: '2 3-rd',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 0
                },
                {
                    text: '3 3-rd',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 0
                }
            ]
        },
        {
            question: 'asdognoasdjng',
            answers: [
                {
                    text: '1 4-th',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 1
                },
                {
                    text: '2 4-th',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 0
                },
                {
                    text: '3 4-th',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 0
                }
            ]
        },
        {
            question: 'adfjbasodnbaspidb',
            answers: [
                {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, ex.',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 0
                },
                {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, ex.',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 0
                },
                {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, ex.',
                    hint: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, suscipit!',
                    rate: 1
                }
            ]
        }
    ];

    document.addEventListener('DOMContentLoaded', () => {
        const quiz = new Quiz({
            stages,
            rootNode: document.querySelector('.root')
        });

        quiz[ start ]();
    });
})();
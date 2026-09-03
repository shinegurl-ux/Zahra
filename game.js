const dialogue = document.getElementById("dialogue");
const choicesBox = document.getElementById("choices");
const dialogueBox = document.getElementById("dialogue-box");
const character = document.getElementById("character");
const nameBox = document.getElementById("name-box");
const game = document.getElementById("game");

let current = 0;
let typing = false;
let fullText = "";
let typingTimer = null;

let normalToggle = false;


/* =====================================================
   صور زهرة
   ===================================================== */

const images = {
    normal: "normal_zahra.png",
    anotherNormal: "another_normal_zahra.png",
    angry: "angry_zahra.png",
    disappointed: "disappointed_zahra.png",
    hmm: "hmm_zahra.png"
};


/* =====================================================
   تغيير صورة زهرة
   ===================================================== */

function setCharacter(expression) {

    if (images[expression]) {
        character.src = images[expression];
    }
}


/* =====================================================
   تبديل التعبير الطبيعي
   Normal ↔ Another Normal
   ===================================================== */

function normalExpression() {

    normalToggle = !normalToggle;

    if (normalToggle) {
        setCharacter("normal");
    } else {
        setCharacter("anotherNormal");
    }
}


/* =====================================================
   القصة
   ===================================================== */

const story = [

    {
        type: "text",
        speaker: "زهرة",
        text: "مرحبا أيها الفضولي! أنا سعيدة لكونك تجرب هذا الشيء الذي صنعته، ولكي أكون صادقة لم أصنع هذا الشيء إلا للتجربة والتفاخر همممم."
    },

    {
        type: "text",
        speaker: "زهرة",
        text: "أنا حقا أحتاج للتفاعل معك لأنه بالتأكيد لا تسير اللعبة كاملة هكذا، لذا سوف أسألك بعض الأسئلة عن صانعة هذه التجربة العظيمة المبجلة المذهلة المد... أححم."
    },

    {
        type: "text",
        speaker: "زهرة",
        text: "إذا لنبدأ مع أول سؤال، ما اسمها؟"
    },

    {
        type: "choice",

        question: "ما اسمها؟",

        choices: [
            {
                text: "نور",
                response: "صح عليك! إذن أنت فضولية وذكية.",
                expression: "normal"
            },

            {
                text: "ضوء",
                response: "أحول الفكر! تحتاج لإرتداء نظارات لعقلك. اسم نور أوسع من الضوء، ألا تستطيع التفكير!",
                expression: "angry"
            }
        ]
    },

    {
        type: "text",
        speaker: "زهرة",
        text: "ما اسم نور الثاني؟"
    },

    {
        type: "choice",

        question: "ما اسم نور الثاني؟",

        choices: [
            {
                text: "محمد",
                response: "أووووه يبدو حقا أنك تعرف ما تختار، مبارك عليك.",
                expression: "normal"
            },

            {
                text: "أحمد",
                response: "بدأت بالاقتناع بفكرة نظارات لأحول الفكر والتفكير.",
                expression: "hmm"
            }
        ]
    },

    {
        type: "text",
        speaker: "زهرة",
        text: "ما لون نور المفضل؟"
    },

    {
        type: "choice",

        question: "ما لون نور المفضل؟",

        choices: [
            {
                text: "الأسود",
                response: "بعيد جدا.",
                expression: "disappointed"
            },

            {
                text: "الأصفر",
                response: "صح عليك!",
                expression: "normal"
            }
        ]
    },

    {
        type: "text",
        speaker: "زهرة",
        text: "كونك صديقة لها، ما أكثر شيء تلاحظين أنها تعاني منه؟"
    },

    {
        type: "choice",

        question: "ما أكثر شيء تعاني منه؟",

        choices: [
            {
                text: "السعي للمثالية",
                response: "بعيد تماما.",
                expression: "disappointed"
            },

            {
                text: "التشتت",
                response: "هي كذلك، وأكبر دليل كونك تلعب هذا الشيء.",
                expression: "normal"
            },

            {
                text: "التسويف",
                response: "أحم صحيح نوعا ما ولكن ليس الإجابة الأصح.",
                expression: "hmm"
            }
        ]
    },


    /* =====================================================
       الخطاب
       ===================================================== */

    {
        type: "text",
        speaker: "زهرة",
        text: "ويجب أن نعترف أنه حتى العظماء في بدايتهم لم يكونوا سوى بشر عاديين."
    },

    {
        type: "text",
        speaker: "زهرة",
        text: "يعانون من مشاكل شائعة ورغم أنهم يعرفون الحل إلا أنهم لا يسعون لتطبيقه."
    },

    {
        type: "text",
        speaker: "زهرة",
        text: "أنت تفهم ما أقول."
    },

    {
        type: "text",
        speaker: "زهرة",
        text: "قد تكون شخصا عظيما وأنت لا تدري ذلك. لست مثاليا لأنك في النهاية إنسان، لكني متيقنة أنك عظيم."
    },

    {
        type: "text",
        speaker: "زهرة",
        text: "أنا مؤمنة أن كل إنسان فيه جزء عظيم لا يعرفه كموهبة ما. وكيف يكتشف هذا الإنسان الجزء؟ بالتجربة مثلي أنا بهذه اللعبة."
    },

    {
        type: "text",
        speaker: "زهرة",
        text: "هل قد اكتشفت ذلك الجزء العظيم فيك أم لا؟"
    },

    {
        type: "choice",

        question: "هل قد اكتشفت ذلك الجزء العظيم فيك؟",

        choices: [
            {
                text: "نعم",
                response: "أتمنى أن تشاركني قصتك.",
                expression: "normal"
            },

            {
                text: "لا",
                response: "بالتوفيق برحلتك، هيا بنا!",
                expression: "hmm"
            }
        ]
    },


    /* =====================================================
       النباتات
       ===================================================== */

    {
        type: "text",
        speaker: "زهرة",
        text: "سؤال مفاجئ! التكاثر في النباتات الزهرية؟",
        expression: "hmm"
    },

    {
        type: "choice",

        question: "التكاثر في النباتات الزهرية؟",

        choices: [
            {
                text: "جنسي",
                response: "صحيح! خرجت من تعميم المعلمة ريهام: والله مانتم فاهمين شي. وعلى الأقل عرفت الجواب هنا!",
                expression: "normal"
            },

            {
                text: "لا جنسي",
                response: "بجدية؟",
                expression: "disappointed"
            }
        ]
    },


    /* =====================================================
       المريخ
       ===================================================== */

    {
        type: "text",
        speaker: "زهرة",
        text: "ما هو لون كوكب المريخ؟"
    },

    {
        type: "choice",

        question: "ما هو لون كوكب المريخ؟",

        choices: [
            {
                text: "أحمر",
                response: "صحيح! هل استطعت رؤية ذلك بنفسك! نعلم أن الأرض لونها أزرق نوعا ما من فوق بسبب أن الجزء الأكبر بها الماء.",
                expression: "normal"
            },

            {
                text: "أزرق",
                response: "صحيح! إن كان مثلجا.",
                expression: "hmm"
            }
        ]
    },

    {
        type: "text",
        speaker: "زهرة",
        text: "هل يا ترى المريخ مغطى بالياقوت الأحمر؟! همممم",
        expression: "hmm"
    },


    /* =====================================================
       أكبر عظمة
       ===================================================== */

    {
        type: "text",
        speaker: "زهرة",
        text: "ما أكبر عظمة في جسم الإنسان؟"
    },

    {
        type: "choice",

        question: "ما أكبر عظمة في جسم الإنسان؟",

        choices: [
            {
                text: "عظمة الفخذ",
                response: "—إيماءة— ذكي كما عهدتك!",
                expression: "normal"
            },

            {
                text: "عظمة العضد",
                response: "أشر لي على عضدك يا متذاكي.",
                expression: "angry"
            }
        ]
    },


    /* =====================================================
       الملح
       ===================================================== */

    {
        type: "text",
        speaker: "زهرة",
        text: "هل الملح الذي نستخدمه غالبا في الطعام مركب أم عنصر؟"
    },

    {
        type: "choice",

        question: "الملح الذي نستخدمه في الطعام مركب أم عنصر؟",

        choices: [
            {
                text: "مركب",
                response: "دعني أحزر، لابد أنك من القسم العلمي! هل يمكنك ذكر أول براند ملح ظهر بعقلك؟",
                expression: "normal"
            },

            {
                text: "عنصر",
                response: "اححححح... —أصوات استياء—",
                expression: "disappointed"
            }
        ]
    },


    /* =====================================================
       القمر
       ===================================================== */

    {
        type: "text",
        speaker: "زهرة",
        text: "هل القمر يصدر ضوءه بنفسه؟"
    },

    {
        type: "choice",

        question: "هل القمر يصدر ضوءه بنفسه؟",

        choices: [
            {
                text: "لا",
                response: "صحيح! لأنه يعكس ضوء الشمس. حتى القمر قاصر لوحده، أفضل أن أشبه بالشمس على القمر. لكن بالنسبة لي أنت قمر يشع لوحده.",
                expression: "normal"
            },

            {
                text: "نعم",
                response: "ما عندي رد لك.",
                expression: "disappointed"
            }
        ]
    },


    /* =====================================================
       DNA
       ===================================================== */

    {
        type: "text",
        speaker: "زهرة",
        text: "أين توجد معظم المادة الوراثية DNA في الخلية؟"
    },

    {
        type: "choice",

        question: "أين توجد معظم المادة الوراثية DNA؟",

        choices: [
            {
                text: "النواة",
                response: "بديهي.",
                expression: "normal"
            },

            {
                text: "الغشاء الخلوي",
                response: "فقدت الأمل فيك.",
                expression: "disappointed"
            }
        ]
    },


    /* =====================================================
       حرب البسوس
       ===================================================== */

    {
        type: "text",
        speaker: "زهرة",
        text: "حرب البسوس كانت بسبب؟"
    },

    {
        type: "choice",

        question: "حرب البسوس كانت بسبب؟",

        choices: [
            {
                text: "ناقة",
                response: "صحيح ودرامي جدا.",
                expression: "normal"
            },

            {
                text: "اختلافات سياسية",
                response: "صحيح نوعا ما، لكن أميل للاختيار غير المتوقع.",
                expression: "hmm"
            }
        ]
    },


    /* =====================================================
       النهاية
       ===================================================== */

    {
        type: "text",
        speaker: "زهرة",
        text: "وهنا أستطيع أن أقول إن أفكاري نفذت للوقت الحالي، أو بالحقيقة لدي الكثير من الأفكار لكن لا أملك الوقت الكافي."
    },

    {
        type: "text",
        speaker: "زهرة",
        text: "حسنا تعبت من هذا الشيء."
    },

    {
        type: "end",
        speaker: "زهرة",
        text: "وداعا."
    }

];


/* =====================================================
   الكتابة التدريجية
   ===================================================== */

function typeText(text) {

    clearInterval(typingTimer);

    fullText = text;
    dialogue.textContent = "";

    let index = 0;

    typing = true;

    typingTimer = setInterval(() => {

        dialogue.textContent += fullText[index];

        index++;

        if (index >= fullText.length) {

            clearInterval(typingTimer);

            typing = false;
        }

    }, 25);
}


/* =====================================================
   عرض المشهد
   ===================================================== */

function showScene() {

    const scene = story[current];

    choicesBox.innerHTML = "";
    choicesBox.style.display = "none";

    game.classList.remove("choosing");

    nameBox.textContent = scene.speaker || "زهرة";


    /* الحوار العادي */

    if (scene.type === "text") {

        if (scene.expression) {

            setCharacter(scene.expression);

        } else {

            normalExpression();
        }

        typeText(scene.text);

        dialogueBox.onclick = advance;
    }


    /* الاختيارات */

    else if (scene.type === "choice") {

        showChoices(scene);
    }


    /* النهاية */

    else if (scene.type === "end") {

        setCharacter("normal");

        typeText(scene.text);

        dialogueBox.onclick = advance;
    }
}


/* =====================================================
   عرض الاختيارات
   ===================================================== */

function showChoices(scene) {

    game.classList.add("choosing");

    choicesBox.innerHTML = "";

    /* عنوان السؤال */

    const question = document.createElement("div");

    question.className = "choice-question";

    question.textContent = scene.question;

    choicesBox.appendChild(question);


    /* الأزرار */

    scene.choices.forEach((choice) => {

        const button = document.createElement("button");

        button.className = "choice";

        button.textContent = choice.text;

        button.onclick = () => {

            showResponse(choice);
        };

        choicesBox.appendChild(button);
    });

    choicesBox.style.display = "flex";
}


/* =====================================================
   رد الاختيار
   ===================================================== */

function showResponse(choice) {

    game.classList.remove("choosing");

    choicesBox.style.display = "none";

    nameBox.textContent = "زهرة";


    /* تغيير تعبير زهرة */

    if (choice.expression) {

        setCharacter(choice.expression);

    } else {

        normalExpression();
    }


    typeText(choice.response);


    /* عند الضغط بعد الرد */

    dialogueBox.onclick = function () {

        /* إذا النص لم ينته بعد:
           أكمله فورا */

        if (typing) {

            clearInterval(typingTimer);

            dialogue.textContent = fullText;

            typing = false;

            return;
        }


        /* النص انتهى:
           نرجع لمسار القصة */

        dialogueBox.onclick = advance;

        advance();
    };
}


/* =====================================================
   الانتقال للمشهد التالي
   ===================================================== */

function advance() {

    /* إذا كان النص يكتب، أظهره كاملا */

    if (typing) {

        clearInterval(typingTimer);

        dialogue.textContent = fullText;

        typing = false;

        return;
    }


    current++;


    if (current >= story.length) {

        return;
    }


    showScene();
}


/* =====================================================
   تشغيل اللعبة
   ===================================================== */

showScene();

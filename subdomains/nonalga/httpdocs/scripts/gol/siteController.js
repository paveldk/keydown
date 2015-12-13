(function () {

    var rnd1, rnd2, rdn3, rndW, rndH, rndTo, mDown = true;
    var introMsg = "<article id='intro'><h2>Важно!!!</h2><p>Този сайт е разработен през далечната бъдеща 2115 година. Важно е да се знае за технологиите по това време, че дават възможност на потребителите да свързват външния свят със своите сайтове, като те ще отразяват обстановката, с която са свързани. Например ако един блогър, пишеш за екскурзии и пътешествия свърже сайта си с Хаваите, то всичко случващо се там, ще получава някакво отражение на сайта му - какво е времето, дали не е ударило някое цунами и т.н.</p><p>Този сайт е свързан с Интересна планета (планетата се казва Интересна'). И поради нападението на Вододораслите, за което можете да прочетете във дневника на сайта, станцията, намираща се на планетата е на път да бъде разрушена. За това имате само 5 минути (300 секунди) време да разгледате сайта, преди той да изгуби връзка с планетата. Разбира се, бутона за пускане на гравитационното поле(което е разрушено след нападението на Вододораслите), ще ви даде някакво удобство, но на каква цена? Всеки път когато стабилизирате сайта, времето оставащо до експлозията намалява... Също така прекомерното използване на гравитацията може до доведе до преждевременно избухване.</p><p>Времето ви вече тече... За колко време можете да разгледате сайта?</p></article>"
    var warningMsg = "<section id='warning'><img src='images/warning.png' width='200' height='164' alt='warning img'/><h2>No connection with site environment</h2></section>"
    var simulation = "<article>                    <h1>Игра на Живот</h1>                    <form id='golForm' method='post' action='' class='clearfix'>                        <fieldset id='fieldSettings' class='left'>                            <legend>Настройки на полето</legend>                            <input type='number' name='numFieldSize' size='3' id='fieldSize' min='3' max='100' value='15' />                            <label for='fieldSize'>Размер на полето</label><br />                                                        <input type='number' name='txtTurns' size='3' id='txtTurns' min='1' max='100' value='10' />                            <label for='txtTurns'>Брой ходове</label><br />                                                        <input type='number' name='txtNonalgas' size='3' id='txtNonalgas' min='1' max='995' value='3' />                            <label for='txtNonalgas'>Брой водонедорасли</label>                            <ul>                                <li><input type='radio' name='fieldMode' id='rbRandomFood' value='1' checked/><label for='rbRandomFood'>Постави произволна храна</label></li>                                <li><input type='radio' name='fieldMode' id='rbPlaceFood' value='0' /><label for='rbPlaceFood'>Аз ще поставя храната</label></li>                            </ul>                        </fieldset>                        <fieldset id='foodSettings' class='right'>                            <legend>Настройки на храната</legend>                            <label for='rngPerc'>Процент на храната, намираща се на полето. [min: 0%]</label>                            <input type='range' name='rngPerc' id='rngPerc' min='0' max='100' value='20' />                            <span>[max: 100%]</span>                            <label for='txtPerc'>Процент: </label>                            <input type='text' id='txtPerc' value='20' size='3' disabled/>                            <label for='txtFoodCells'>Клетки с храна: </label>                            <input type='text' id='txtFoodCells' value='64' size='5' disabled/>                            <input type='button' id='btnGenerateFood' class='button' value='Генерирай произволна храна' />                        </fieldset>                        <fieldset id='placedFood' class='right'>                            <legend>Поставена храна</legend>                            <label for='txtPlacedFood'>Поставена храна: </label>                            <input type='text' id='txtPlacedFood' value='0' size='5' disabled/>                        </fieldset>                        <input type='submit' id='btnStartPlay' class='button' value='Старт' />                    </form><div id='game-field'></div></article>";
    var team = "<article><h1>Нашият екип</h1><p>Освен няколко неразговорливи учени, екипът ни се състои от Павел Колев и Атанас Керанов и двамата уж програмисти, носители на рекорд в Гинес за изглеждане на целия сериал 'Дързост и красота'. Иначе си търсим дизайнер (Благодарим на Адриана Йорданова за помощта на този).</p></article>";
    var diary = "<div id='diary-a'><article><span>06.05.2115</span><h2>Излитаме!</h2><p>След дълго очакване най-после сме в совалката. Стигнахме до точката, в която Феликс скочи преди 1 век. Нищо чудно, че не е правил повторни опити. Тук е прекалено високо. Тоя човек няма акъл. Не трябваше да пием толкова бира преди излитането. Дано на интересната планета да има някаква форма на алкохол, защото няколкото галона, които взехме вместо ръчен багаж вече се изчерпаха.</p></article><article><span>12.05.2115</span><h2>Нова Година!</h2><p>Имам чувството, че е Нова Година. Всичко свети като в новогодишна нощ. Дори и изпитият алкохол конкурира като количество този от новогодишния запой. Учените от екипа ни гледат осъдително. Имахме късмет, че 'Дързост и красота' приключи преди да се качим на совалката. Сега ще имаме щастието да направим сапунен маратон, гледайки тази 130-годишна висша форма на произведение на изкуството.</p><p>Звезди накъдето и да погледнеш. В този ред на мисли... опитахме се да разкажем на учените на борда за най-голямата българска звезда - Азис, но не ни слушаха с особен ентусиазъм. Остава ни единствено да гледаме 'How I met your mother' и да чоплим слънчогледови семки. Космосът е много скучен, недейте да идвате! Навсякъде има светлини, но чувството в никакъв случай не може да се сравни с това в пернишка дискотека!</p></article><article><span>05.11.2117</span><h2>Кацаме!</h2><p>Пропуснахме доста писане, защото така или иначе гледахме сериали през цялото време. Рич почина, Стефани изневери на Ерик със сина му, а от сълзите, които изплакахме, бордът започна да хваща ръжда. Искат от нас да измислим алгоритъм, с който да произвеждаме бира в неблагоприятни условия, при това с голям коефициент на полезно действие. Ще намерим начин!</p><p>На тази планета само мъгла и локви. Поставиха ни задача да напишем алгоритъм, който да симулира развитието на тукашната микрофлора.</p><p>Измислихме алгоритъм. Всичко работи перфектно и без бъгове. Капитанът ни предостави камера и ни заповяда да водим дневник, тъй като вече активно участваме в мисията. Дано не ни се налага да пишем повече.</p></article><article><span>06.10.2117</span><h2>Откритие!</h2><p>Учените са открили организми с много странно поведение. Организмите изглеждат мъртви, включително поразени от некроза на тъканите. Въпреки това, тестовете са открили висока клетъчна активност и движение.</p></article><article><span>21.01.2118</span><h2>Те са живи!</h2><p>Откритите организми продължават да растат. Определено се забелязват моторни функции, въпреки липсата на мозъчни клетки. Прекалено интелигентно започнахме да звучим - усеща се липсата на бира. Учените на кораба ги наричат с кодовото име 'дивелопери'. Също така разбрахме, че организмите са развили конусовиден орган покрит с милиарди микроскопични мускулни влакна, които вибрират с висока честота. Явно това им позволява да се движат безпроблемно в калта, която покрива почти цялата повърхност на тази планета. Интересно дали това откритие би подпомогнало по някакъв начин социалния живот на нас програмистите...</p></article><article><span>13.09.2119</span><h2>Притеснително!</h2><p>Организмите са развили орган с някакъв вид зрителна функция. Отделиха силно разяждаща течност, явно с цел да избягат от контейнера, след като им показахме снимка на Азис. Дано учените не разберат, че сме влизали в експерименталната зала без разрешение.</p></article><article><span>12.12.2122</span><h2>Те са навсякъде!</h2><p>Те са чудовища! Няколко от учените вече не са между насфсдаоифсдасоидцосдмо;садцо;ий.,м/</p></article><article><h2>Видео дневник - 06.10.2017</h2><iframe width='560' height='315' src='http://www.youtube.com/embed/PcoXm--d7yo' frameborder='0' allowfullscreen></iframe></article><article><h2>Видео дневник - 21.01.2018</h2><iframe width='560' height='315' src='http://www.youtube.com/embed/eSm4UJimG8E' frameborder='0' allowfullscreen></iframe></article><article><h2>Видео дневник - 12.12.2122</h2><iframe width='560' height='315' src='http://www.youtube.com/embed/3JYa_iPEhik' frameborder='0' allowfullscreen></iframe></article></div>";
    var mission = "<article><h1>Нашата мисия</h1><p>Годината е 2115 (краят на света никога не идва навреме). Учените от Националната Астробиологическа Институция за Широкоспектърно-Космическа Валидация на Организми (НАИШ-КВО) са открили нещо, което наричат “интересна планета”. Интересното на планетата е, че в атмосферата ѝ има газове, които типично се произвеждат от живи организми. НАИШ-КВО решават да пратят екип от астронавти, заедно с няколко програмисти в наше лице, които да посетят планетата и да изследват ситуацията там - независимо какво ще струва това.</p><p>Когато достигнахме планетата след достатъчно дълго пътуване, за да изгледаме How I Met Your Mother, Дързост и Красота, както и израстването на едно цвете (последното не е филм), ние слязохме от Галактическия Обект за Транспорт на други Обекти (GOTO) и започнахме да изследваме планетата. Откритията ни показват, че няма достатъчно висши форми на живот, за да има с кого да си пием Бързия Интоксикант за Рехабилитация и Активизация (БИРА), но за сметка на това големи области от планетата са покрити от водоподобна слуз, в която по особено интересен начин живеят малки организми. Тези организми изглежда имат доста силен потенциал за развитие. Още повече, изследванията показват, че тези организми, докато са активни, могат да бъдат ползвани за произвеждане на Живо Извлечение с Вискозитет Алфа от Бързия Интоксикант за Рехабилитация и Активизация (ЖИВАБИРА). За съжаление организмите са твърде малко към този етап. Затова ги наричаме “водонедорасли”. Със сегашното темпо на развитие, няма да доживеем да създадем ЖИВАБИРА от водонедорасли.</p><img src='images/astro.jpg' width='500' height='313' alt='astro img' class='astro' /></article>"
    var foundings = "<div id='foundings'><h1>Нашите открития</h1><article><h2>Still Form - Block</h2><img class='astro' src='images/block.PNG' alt='Still Form Block' width='57' height='57' /><p>Статична форма на живот. От нея не се раждат нови клетки, а съществуващите не умират.</p></article><article><h2>Oscillator - Blinker</h2><img class='astro' src='images/blinker.PNG' alt='Oscillator Blinker' width='83' height='32' /><p>Тази форма на живот повтаря своята форма през едно поколение като винаги запазва броя на популацията си. На всеки ход умират 2 клетки и се раждат 2 нови клетки.</p></article><article><h2>Six in a line</h2><img class='astro' src='images/SixLine.PNG' alt='Six in a Line' width='158' height='33' /><p>Организмът се разраства изключително бързо. Удвоява популацията си в следващото поколение, но за съжаление умира след 12 поколения.</p></article><article><h2>Baby pulsar</h2><img class='astro' src='images/pulsar.PNG' alt='Baby Pulsar' width='183' height='83' /><p>Бебето пулсар се разраства сравнително бързо като може да увеличи популацията си до 9 пъти докато съзрее. Пулсарът съзрява за 24 поколения, а след това повтаря формата си на всяко 3-то поколение.</p></article><article><h2>Growing H</h2><img class='astro' src='images/H.PNG' alt='Growing H' width='157' height='83' /><p>Наречен така заради формата и свойствата си, този организъм стартира само с 10 клетки, а може да достигне внушителните 344 след 139 поколения. След достатъчен брой поколения организмът достига статична форма при популация от 80 клетки.</p></article></div>";
    var SiteController = function (param) {

        this.fieldContainer = param.fieldContainer;

        this.stable = $(param.stable);

        this.mainContent = document.getElementById(param.mainContent);
        this.mainContentMaxH = $(document).height() - this.mainContent.offsetHeight;
        this.mainContentMaxW = $(document).width() - this.mainContent.offsetWidth;

        this.items = document.getElementById(param.nav).children;
        this.userWidth = $(document).width() - this.items[0].offsetWidth;
        this.userHeight = $(document).height() - this.items[0].offsetHeight;
        this.contWidth = $(document).height() - document.getElementById('main-content-wrapper').offsetHeight;

        this.itemsFixed = [[580, 55], [580, 195], [580, 335], [580, 475], [580, 615]]

        this.golForm = $(param.golForm);

        this.btnGenerateFood = $(param.btnGenerateFood);
        //   this.btnPlaceFood = $(param.btnPlaceFood);

        this.fieldSize = $(param.fieldSize);

        this.fieldMode = $(param.fieldMode);
        this.foodSettings = $(param.foodSettings);
        this.rbRandomFood = $(param.rbRandomFood);
        this.placedFood = $(param.placedFood);
        this.rngPerc = $(param.rngPerc);
        this.txtPerc = $(param.txtPerc);
        this.txtFoodCells = $(param.txtFoodCells);
        this.txtPlacedFood = $(param.txtPlacedFood);

        this.n = param.n || 20;
        this.size = param.size || 25;

        this.foodToPlace = 0;

        this.stableOn = false;

    };

    SiteController.prototype = {
        init: function () {
            var that = this;
            //$('#wrapper').vibrate({ speed: 200 })
            that.setInitialPositions();
            chaosInterval = setInterval(that.startNavChaos.bind(that), 50);
            //stable.on("click", that.stableOn.bind(that));

            //that.initField();

            that.bindInteraction();
            timeRemaining = 300;
            that.startTimer();
            // setInterval(that.startContentChaos.bind(that), 20);
        },

        startTimer: function () {
            var tTimer = setInterval(function () {
                timeRemaining--;
                $("#detonator").empty();
                $("#detonator").append('<h4>' + timeRemaining + '</h4>' + "<span>secs to detonation</span>");
                if (timeRemaining <= 0) {
                    clearInterval(tTimer);

                    $('#wrapper').hide('explode', { pieces: 32 }, 4000);
                    $('#main-menu').hide('explode', { pieces: 32 }, 4000);
                    setTimeout(function () {
                        $('body').empty();
                        clearInterval(chaosInterval);



                        $('body').append(warningMsg);
                        $('#warning').modal({ onOpen: function (dialog) {
                            dialog.overlay.fadeIn('slow', function () {
                                dialog.data.hide();
                                dialog.container.fadeIn('slow', function () {
                                    dialog.data.slideDown('slow');
                                });
                            });
                        },
                            onClose: function (dialog) {
                                dialog.data.fadeOut('slow', function () {
                                    dialog.container.hide('slow', function () {
                                        dialog.overlay.slideUp('slow', function () {
                                            $.modal.close();
                                            window.location = "http://keydown.org";
                                        });
                                    });
                                });
                            }
                        });


                    }, 4000)
                }
            }, 1000);
        },

        setInitialPositions: function () {
            this.itemMoveTo = new Array(this.items.length + 1);
            var iHeight = this.items[0].offsetHeight;
            for (var i = 0; i < this.items.length; i++) {
                rndH = Math.floor((Math.random() * (this.userHeight - iHeight)) + 0);
                this.items[i].style.top = rndH + 'px';
                rndW = Math.floor((Math.random() * (this.userWidth - iHeight)) + 0);
                this.items[i].style.left = rndW + 'px';
                rndTo = Math.floor((Math.random() * 4) + 0);
                this.itemMoveTo[i] = rndTo;
            }
            //this.itemMoveTo[this.itemMoveTo.length] = rndTo;
            //this.mainContent.style.top = "50px";
            //this.mainContent.style.left = "100px";
        },
        startContentChaos: function () {
            //	var a = this.mainContent.offsetHeight;
            //	var b = this.mainContent.offsetWidth;
            //	var d = Math.pow(a,2) + Math.pow(b,2);
            //	var A = $(this.mainContent).getRotationDegrees();
            //	var sinB = b / d;
            //	var x = d * (sinB*Math.cos(A) - Math.sin(90-A)*Math.sin(A));

            //var bottomLeftL = this.mainContent.style.left - Math.sin($(this.mainContent).getRotationDegrees()) * a;
            //var topRightL = this.mainContent.style.left + Math.sin(90 - $(this.mainContent).getRotationDegrees()) * b;
            rnd1 = 1;
            rnd2 = 1;
            this.mainContent.style.top = parseInt(this.mainContent.style.top) + rnd1 + 'px';
            this.mainContent.style.left = parseInt(this.mainContent.style.left) + rnd2 + 'px';
            $(this.mainContent).rotBy(1);
            if (parseInt(this.mainContent.style.top) < this.userHeight && parseInt(this.mainContent.style.top) > 0 && parseInt(this.mainContent.style.left) > 0 && parseInt(this.mainContent.style.left) < this.userWidth) {

            }
        },
        startNavChaos: function () {
            if (this.stableOn == false) {
                var l = $('#main-content-wrapper').position();
                if (mDown) {
                    l = parseInt(l.top) + 2 + 'px';
                    $('#main-content-wrapper').css('top', l);
                    if (parseInt(l) >= this.contWidth) {
                        mDown = !mDown;
                    }
                }
                else {
                    l = parseInt(l.top) - 1 + 'px';
                    $('#main-content-wrapper').css('top', l);
                    if (parseInt(l) <= 0) {
                        mDown = !mDown;
                    }
                }

                for (var i = 0; i < this.items.length; i++) {
                    //rnd1 = Math.floor(Math.random() * 9) % 2;
                    //rnd2 = Math.floor(Math.random() * 9) % 2;
                    rnd1 = 1;
                    rnd2 = 1;
                    if (parseInt(this.items[i].style.top) < this.userHeight && parseInt(this.items[i].style.top) > 0 && parseInt(this.items[i].style.left) > 0 && parseInt(this.items[i].style.left) < this.userWidth) {
                        switch (this.itemMoveTo[i]) {
                            case 0:
                                this.items[i].style.top = parseInt(this.items[i].style.top) - rnd1 + 'px';
                                this.items[i].style.left = parseInt(this.items[i].style.left) + rnd2 + 'px';
                                $(this.items[i]).rotBy(1);
                                break;
                            case 1:
                                this.items[i].style.top = parseInt(this.items[i].style.top) + rnd1 + 'px';
                                this.items[i].style.left = parseInt(this.items[i].style.left) + rnd2 + 'px';
                                $(this.items[i]).rotBy(1);
                                break;
                            case 2:
                                this.items[i].style.top = parseInt(this.items[i].style.top) + rnd1 + 'px';
                                this.items[i].style.left = parseInt(this.items[i].style.left) - rnd2 + 'px';
                                $(this.items[i]).rotBy(-1);
                                break;
                            default:
                                this.items[i].style.top = parseInt(this.items[i].style.top) - rnd1 + 'px';
                                this.items[i].style.left = parseInt(this.items[i].style.left) - rnd2 + 'px';
                                $(this.items[i]).rotBy(-1);
                        }
                    }
                    else if (parseInt(this.items[i].style.top) == this.userHeight) {
                        if (this.itemMoveTo[i] == 1) {
                            this.items[i].style.top = parseInt(this.items[i].style.top) - 1 + 'px';
                            this.items[i].style.left = parseInt(this.items[i].style.left) + 1 + 'px';
                            this.itemMoveTo[i] = 0;
                        }
                        if (this.itemMoveTo[i] == 2) {
                            this.items[i].style.top = parseInt(this.items[i].style.top) - 1 + 'px';
                            this.items[i].style.left = parseInt(this.items[i].style.left) - 1 + 'px';
                            this.itemMoveTo[i] = 3;
                        }
                    }
                    else if (parseInt(this.items[i].style.left) == this.userWidth) {
                        if (this.itemMoveTo[i] == 0) {
                            this.items[i].style.top = parseInt(this.items[i].style.top) - 1 + 'px';
                            this.items[i].style.left = parseInt(this.items[i].style.left) - 1 + 'px';
                            this.itemMoveTo[i] = 3;
                        }
                        if (this.itemMoveTo[i] == 1) {
                            this.items[i].style.top = parseInt(this.items[i].style.top) + 1 + 'px';
                            this.items[i].style.left = parseInt(this.items[i].style.left) - 1 + 'px';
                            this.itemMoveTo[i] = 2;
                        }
                    }
                    else if (parseInt(this.items[i].style.top) == 0) {
                        if (this.itemMoveTo[i] == 0) {
                            this.items[i].style.top = parseInt(this.items[i].style.top) + 1 + 'px';
                            this.items[i].style.left = parseInt(this.items[i].style.left) + 1 + 'px';
                            this.itemMoveTo[i] = 1;
                        }
                        if (this.itemMoveTo[i] == 3) {
                            this.items[i].style.top = parseInt(this.items[i].style.top) + 1 + 'px';
                            this.items[i].style.left = parseInt(this.items[i].style.left) - 1 + 'px';
                            this.itemMoveTo[i] = 2;
                        }
                    }
                    else if (parseInt(this.items[i].style.left) == 0) {
                        if (this.itemMoveTo[i] == 2) {
                            this.items[i].style.top = parseInt(this.items[i].style.top) + 1 + 'px';
                            this.items[i].style.left = parseInt(this.items[i].style.left) + 1 + 'px';
                            this.itemMoveTo[i] = 1;
                        }
                        if (this.itemMoveTo[i] == 3) {
                            this.items[i].style.top = parseInt(this.items[i].style.top) - 1 + 'px';
                            this.items[i].style.left = parseInt(this.items[i].style.left) + 1 + 'px';
                            this.itemMoveTo[i] = 0;
                        }
                    }
                }
            }
        },

        stabilize: function () {

            var that = this;

            if (this.stableOn == false) {
                clearInterval(chaosInterval);
                this.stableOn = true;
                var startDur = 30;
                timeRemaining -= 30;
                this.stable.attr('class', 'greenbutton');
                var cssObj = {
                    'position': 'relative',
                    'width': '800px',
                    'margin': '0 auto'
                };
                $('#main-header').css(cssObj);

                var stableDuration = setInterval(function () {
                    startDur--;
                    $("#stable").empty();
                    $("#stable").append('<h4>' + startDur + '</h4>' + "<span>secs</span>");
                    if (startDur == 0) {
                        clearInterval(reposition);
                        clearInterval(tm);
                        $("#stable").empty();
                        $("#stable").append("Gravity");
                        $("#stable").attr('class', 'redbutton');
                        $('#main-header').removeAttr('style');
                        clearInterval(stableDuration);
                        that.stableOn = false;

                        var backToChaos = setInterval(function () {

                            $('#glow-left').fadeOut('slow');
                            $('#glow-right').fadeOut('slow');
                            var l = $('#holder-left').position();
                            l = parseInt(l.left) + 5 + 'px';
                            $('#holder-left').css('left', l);
                            $('#holder-right').css('right', l);
                            if (parseInt(l) == -200) {
                                clearInterval(backToChaos);
                            }
                        }, 100);
                        // clearInterval(repNav);
                        chaosInterval = setInterval(that.startNavChaos.bind(that), 50);
                        return;
                    }
                }, 1000);



                tm = setInterval(function () {
                    var l = $('#holder-left').position();
                    l = parseInt(l.left) - 5 + 'px';
                    $('#holder-left').css('left', l);
                    $('#holder-right').css('right', l);
                    if (parseInt(l) < -250) {
                        clearInterval(tm);
                    }
                    if (parseInt(l) == -250) {
                        $('#glow-left').fadeIn('slow');
                        $('#glow-right').fadeIn('slow');

                        reposition = setInterval(function () {
                            var th = that;
                            var l = $('#main-content-wrapper').position();
                            l = parseInt(l.top) - 5 + 'px';
                            $('#main-content-wrapper').css('top', l);
                            if (parseInt(l) <= 0) {
                                for (var i = 0; i < th.items.length; i++) {
                                    $(th.items[i]).animate({
                                        top: th.itemsFixed[i][0],
                                        left: th.itemsFixed[i][1]
                                    }, {
                                        step: function (now, fx) {
                                            $(this).css('-webkit-transform', 'rotate(0deg)');
                                        }
                                    }, 2000);
                                }
                                clearInterval(reposition);
                            }
                        }, 20);
                        clearInterval(tm);

                    }
                }, 50);

            }
            else {
                return;
            }
        },

        bindInteraction: function () {
            var that = this;

            this.stable.off('click');
            this.golForm.off('submit');
            this.rngPerc.off('change');
            this.fieldSize.off('change')
            this.btnGenerateFood.off('click');
            $('#mission').off('click');
            $('#foundings').off('click');
            $('#simulation').off('click');
            $('#diary').off('click');
            $('#team').off('click');

            this.stable.on('click', this.stabilize.bind(that));


            this.golForm.on('submit', function (e) {
                var th = that;
                e.preventDefault();
                $('#golForm').append("<button class='button' id='btnAction'>Развитие</button>");
                $('#btnAction').on('click', function (e) {
                    e.preventDefault();
                    var a = $('#txtTurns').val();
                    th.gameOfLife.playAction(a);
                });
                $('#btnStartPlay').attr('disabled', 'disabled');
                var c = $('#fieldSize').val();
                var a = $('#txtTurns').val();
                var b = $('#txtNonalgas').val();
                that.gameOfLife.playGame(a, b, c);
            });

            //            this.btnPlaceFood.on('click', function (e) {
            //                e.preventDefault();
            //                that.golForm.append("<input type='text' size='5' id='' value='" + that.percNum.val() + "' disabled />");
            //                that.gameOfLife.gameField.enableInteraction = true;
            //            });

            this.rngPerc.on("change", function () {
                $('#btnStartPlay').removeAttr('disabled');
                $('#btnAction').remove();
                var v = parseInt(that.rngPerc.val());
                that.txtPerc.val(v);
                that.txtFoodCells.val(parseInt(v * 0.01 * that.n * that.n));
            });

            this.fieldMode.change(function () {
                $('#btnStartPlay').removeAttr('disabled');
                $('#btnAction').remove();
                if (that.rbRandomFood.attr('checked')) {
                    that.foodSettings.fadeIn('slow');
                    that.placedFood.hide();
                    var nn = that.fieldSize.val();
                    that.n = nn;
                    that.txtPlacedFood.val(0);
                    that.gameOfLife.gameField.foodGroup.removeChildren();
                    that.gameOfLife.updateGame(nn);
                }
                else {
                    that.foodSettings.hide();
                    that.placedFood.fadeIn('slow');
                    var nn = that.fieldSize.val();
                    that.n = nn;
                    that.gameOfLife.gameField.flag = true;
                    that.gameOfLife.gameField.foodGroup.removeChildren();
                    that.gameOfLife.updateGame(nn);
                    that.gameOfLife.gameField.enableInteraction = true;
                }
            });

            this.fieldSize.on('change', function () {
                $('#btnStartPlay').removeAttr('disabled');
                $('#btnAction').remove();
                var nn = that.fieldSize.val();
                that.n = nn;
                that.gameOfLife.updateGame(nn);

                var v = parseInt(that.rngPerc.val());
                that.txtFoodCells.val(parseInt(v * 0.01 * that.n * that.n));

                if (!that.rbRandomFood.attr('checked')) {
                    that.gameOfLife.gameField.flag = true;
                }
            });

            this.fieldSize.keyup(function () {
                $('#btnStartPlay').removeAttr('disabled');
                $('#btnAction').remove();
                var nn = parseInt(that.fieldSize.val());
                if (nn < GameOfLife.MIN_FIELD_N || isNaN(nn)) {
                    nn = GameOfLife.MIN_FIELD_N;
                }
                else if (nn > GameOfLife.MAX_FIELD_N) {
                    nn = GameOfLife.MAX_FIELD_N;
                }

                that.n = nn;

                var v = parseInt(that.rngPerc.val());
                that.txtFoodCells.val(parseInt(v * 0.01 * that.n * that.n));
                if (!that.rbRandomFood.attr('checked')) {
                    that.gameOfLife.gameField.flag = true;
                }
                that.gameOfLife.updateGame(nn);
            });

            this.btnGenerateFood.on('click', function (e) {
                $('#btnStartPlay').removeAttr('disabled');
                $('#btnAction').remove();
                e.preventDefault();
                that.gameOfLife.gameField.foodPercentage = parseInt(that.rngPerc.val());
                that.gameOfLife.gameField.enableInteraction = false;
                that.gameOfLife.gameField.generateFood();
            });



            $('#mission').on('click', function (e) {
                e.preventDefault();
                $('#main-content').empty();
                $('#main-content').append(mission);
            });

            $('#foundings').on('click', function (e) {
                e.preventDefault();
                $('#main-content').empty();
                $('#main-content').append(foundings);
            });

            $('#simulation').on('click', function (e) {
                e.preventDefault();
                $('#main-content').empty();
                $('#main-content').append(simulation);
                siteController = new SiteController({
                    nav: "main-menu",
                    mainContent: "main-content",
                    fieldContainer: "game-field",
                    stable: "#stable",
                    golForm: "#golForm",
                    fieldSize: "#fieldSize",
                    //btnPlaceFood: "#btnPlaceFood",
                    fieldMode: "input[name=fieldMode]",
                    rbRandomFood: "#rbRandomFood",
                    foodSettings: "#foodSettings",
                    placedFood: "#placedFood",
                    rngPerc: "#rngPerc",
                    txtPerc: "#txtPerc",
                    txtFoodCells: "#txtFoodCells",
                    btnGenerateFood: "#btnGenerateFood",
                    txtPlacedFood: "#txtPlacedFood"
                });
                siteController.initField();
                siteController.bindInteraction();

            });

            $('#diary').on('click', function (e) {
                e.preventDefault();
                $('#main-content').empty();
                $('#main-content').append(diary);
            });

            $('#team').on('click', function (e) {
                e.preventDefault();
                $('#main-content').empty();
                $('#main-content').append(team);
            });

        },

        initField: function () {
            var gameOfLife = new GameOfLife({ container: this.fieldContainer, n: 15, size: 25, foodPercentage: this.txtPerc.val(), txtPlacedFood: this.txtPlacedFood });
            gameOfLife.init();
            this.gameOfLife = gameOfLife;
        }

    }


    $(document).ready(
        function () {

            $('body').append(introMsg);
            $('#intro').modal({ onOpen: function (dialog) {
                dialog.overlay.fadeIn('slow', function () {
                    dialog.data.hide();
                    dialog.container.fadeIn('slow', function () {
                        dialog.data.slideDown('slow');
                    });
                });
            },
                onClose: function (dialog) {
                    dialog.data.fadeOut('slow', function () {
                        dialog.container.hide('slow', function () {
                            dialog.overlay.slideUp('slow', function () {
                                $.modal.close();
                                $('#intro').remove();
                            });
                        });
                    });
                }
            });


            siteController = new SiteController({
                nav: "main-menu",
                mainContent: "main-content",
                fieldContainer: "game-field",
                stable: "#stable",
                golForm: "#golForm",
                fieldSize: "#fieldSize",
                //btnPlaceFood: "#btnPlaceFood",
                fieldMode: "input[name=fieldMode]",
                rbRandomFood: "#rbRandomFood",
                foodSettings: "#foodSettings",
                placedFood: "#placedFood",
                rngPerc: "#rngPerc",
                txtPerc: "#txtPerc",
                txtFoodCells: "#txtFoodCells",
                btnGenerateFood: "#btnGenerateFood",
                txtPlacedFood: "#txtPlacedFood"
            });
            siteController.init();
        }
    );
})(jQuery);
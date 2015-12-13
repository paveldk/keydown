var app = null;
var cont = true;
var rc = localStorage.getItem('rochHeightCoef') || 5;
var si;

var multiDOM = "<div id='gameContex'></div><div id='gameHUD'><div id='addTool' class='activeButton'>Add</div><div id='removeTool'>Remove</div><a id='backToMenu' class='smallButton' href='/'>Back to Menu</a><div id='trollInfo'><h2>Troll Score</h2><h3 id='trollScore'>0</h3></div><div id='robotInfo'><h2>Robot Score</h2><h3 id='robotScore'>0</h3></div><div id='onMoveContainer'><p>on move:</p><h3 id='onMove'>Troll</h3></div></div>";
var playVsTrollDOM = "<div id='gameContex'></div><div id='gameHUD'><div id='addTool' class='activeButton'>Add</div><div id='removeTool'>Remove</div><a id='backToMenu' class='smallButton' href='/'>Back to Menu</a><div id='turnsLeftContainer'><h3>turns left</h3><h2 id='turnsLeft'></h2></div></div>";
var challangeTrollDOM = "<div id='gameContex'></div><div id='gameHUD'><div id='prvButton'>prev</div><div id='autoplayButton'>autoplay</div><div id='nxtButton'>next</div><a id='backToMenu' class='smallButton' href='/'>Back to Menu</a><div id='turnsLeftContainer'><h3>turns left</h3><h2 id='turnsLeft'></h2></div></div>";
var gameMenuDOM = "<div id='gameMenu'><p>Best experience in Chrome</p><div id='singleplayer' class='button'>Singleplayer Game</div><div id='multiplayer' class='button'>Multiplayer Game</div><div id='instructionsButton' class='button'>Instructions</div><div id='aboutUsButton' class='button'>About KeyDown &trade;</div><div id='settingsButton' class='button'>Settings</div><div id='exit' class='button'>Exit</div></div>";
var singleDOM = "<div id='challangeTroll' class='button'>Challenge Troll</div><div id='playvsTroll' class='button'>Play vs Troll</div><div id='backtomainmenu' class='button'>Back</div>";
var multiModalDOM = "<div id='multiOptions'><h2>Instructions</h2><p>This is a multiplayer mode played by two players. The first one takes the role of the Great Troll and the other one is defending the Robot. You are allowed only one move before switching turns. You can either add a rock or remove a rock during your turn. The winner is the player that has removed more rocks at the end of the game. The game finishes when there are no rocks left on the field.</p><p class='red'>Important: It is important to notice that for the multiplayer each removed rock counts no matter if it was initially on the field or was placed by a player during the game</p><h2>Settings</h2><form id='multiPlayerForm'><fieldset><legend>Settings</legend><label for='fieldSize'>Field Size [min: 2, max: 20]</label> <input id='fieldSize' type='number' value='5' min='2' max='20' /><br /><label for='columnMaxHeight'>Column Max Height [max: 20]</label> <input id='columnMaxHeight' type='number' value='5' min='2' max='20' /><br /><input type='submit' id='multiPlayButton' class='smallButton' value='Play' /></fieldset></form></div>";
var playVsTrollModalDOM = "<div id='playVsTrollOptions'><h2>Instructions</h2><p>In this single player mode you can test your skills against the Great Troll. You are given a random field but you can set the field size and the number of turns to play. You can then add or remove one rock per turn. The game ends when you have no turns left. Then you will see how did the Great Troll manage the same field and his score. In addition later you will be able to watch the Great Troll playing on the same field and see all his moves.</p><p class='red'>IMPORTANT: This mode is not completely finished so there might be some issues. Please report any bugs to keydownteam@gmail.com</p><h2>Settings</h2><form id='playVsTrollForm'><fieldset><legend>Settings</legend><label for='pvtFieldSize'>Field Size [min: 1, max: 20]</label><input id='pvtFieldSize' type='number' value='5' min='1' max='20' /><br /><label for='pvtColumnMaxHeight'>Column Max Height [max: 20]</label><input id='pvtColumnMaxHeight' type='number' value='5' min='0' max='20' /><br /><label for='pvtMaxTurns'>Max Turns [max: 40]</label><input id='pvtMaxTurns' type='number' value='5' min='1' max='40' /><br /><input type='submit' id='pvtButton' class='smallButton' value='Play' /></fieldset></form></div>"
var challangeTrollModalDOM = "<div id='challangeTrollOptions'><h2>Instructions</h2><p>In this singleplayer mode you can challenge the Great Troll which means you can set the field - the rocks, the height, the maximum turns to be played. After that you can just sit on you chair and watch the Troll playing. You can navigate through his moves or autoplay them.</p><p class='red'>IMPORTANT: This mode is not completely finished so there might be some issues. Please report any bugs to keydownteam@gmail.com</p><h2>Settings</h2><form id='challangeTrollForm'><fieldset><legend>Settings</legend><label for='ctFieldSize'>Field Size [min: 1, max: 20]</label><input id='ctFieldSize' type='number' value='5' min='1' max='20' /><br /><label for='ctColumnMaxHeight'>Column Max Height [max: 20]</label><input id='ctColumnMaxHeight' type='number' value='5' min='0' max='20' /><br /><label for='ctMaxTurns'>Max Turns [max: 40]</label><input id='ctMaxTurns' type='number' value='5' min='1' max='40' /><br /><table id='fieldM'></table></fieldset></form><a href='#' id='fieldGenerateButton' class='smallButton'>Enter Field Values</a></div>";

var instructionsModalDOM = "<div id='instructionsOptions'><h2>The Game</h2><p>The wild trolls are very unfriendly, mystical and kind of smelly creatures, inhabiting the deep forests of the even more mystical place called Azzerroth. Keep in mind the trolls are on the top of the food chain in Azzerroth and since they don’t have any natural predators they are very bored. To make their days more interesting the trolls usually create all kinds of crazy games.</p><p>One of the games the trolls play is called Game of Trolls. They even tend to play it with alien creatures, such as unlucky humans, which somehow got to the distant Azzerroth land. The game is played on a square field, made by NxN tiles. Trolls like to pile rocks on top of the tiles and build towers. Each rock adds 1 point to the respective tower’s height. However, there is a great shaman troll judge, who watches over the whole game field, and whenever there are two neighboring towers with equal height, he levels them to the ground. Keep in mind that neighboring towers are two towers which have a common side (are next to each other) and in the beginning of the game there are no neighboring towers with equal height.</p><p>With these rules in mind the trolls take turns to do one of the following operations:</p><ul><li>Add one rock to a tower to increase the tower height with one point</li><li>Remove one rock from a tower to decrease the tower height with one point</li></ul><p>At the end of the game, the player who removed the highest number of rocks from the game field wins. It is of high importance to note, that the great shaman troll judge only counts the difference in rocks between the initial state and the end state of the game field when calculating the end result. Simply put, rocks which are added by one of the players during play time are not being added to the sum of removed rocks if they are removed later in the game.</p><h2>Singleplayer - Play Vs Troll</h2><p>In this single player mode you can test your skills against the Great Troll. You are given a random field but you can set the field size and the number of turns to play. You can then add or remove one rock per turn. The game ends when you have no turns left. Then you will see how did the Great Troll manage the same field and his score. In addition later you will be able to watch the Great Troll playing on the same field and see all his moves.</p><p class='red'>IMPORTANT: This mode is not completely finished so there might be some issues. Please report any bugs to keydownteam@gmail.com</p><h2>Singleplayer - Challenge Troll</h2><p>In this singleplayer mode you can challenge the Great Troll which means you can set the field - the rocks, the height, the maximum turns to be played. After that you can just sit on you chair and watch the Troll playing. You can navigate through his moves or autoplay them.</p><p class='red'>IMPORTANT: This mode is not completely finished so there might be some issues. Please report any bugs to keydownteam@gmail.com</p><h2>Multiplayer</h2><p>This is a multiplayer mode played by two players. The first one takes the role of the Great Troll and the other one is defending the Robot. You are allowed only one move before switching turns. You can either add a rock or remove a rock during your turn. The winner is the player that has removed more rocks at the end of the game. The game finishes when there are no rocks left on the field.</p><p class='red'>Important: It is important to notice that for the multiplayer each removed rock counts no matter if it was initially on the field or was placed by a player during the game</p></div>";
var aboutUsModalDOM = "<div id='aboutUsOptions'><h2>About KeyDown &trade;</h2><p>We are a team of two young developers seeking for new challenges every day. We will welcome anyone who wants to join our team or have any suggestions or fresh ideas. Currently we are looking for a good web designer to join us.</p><h2>Contacts</h2><p>You can contacts us on <a href='mailto:keydownteam@gmail.com'>keydownteam@gmail.com</a></p></div>";
var settingsModalDOM = "<div id='settingsOptions'><h2>Settings</h2><p class='red'>More settings to come.</p><form id='formSettings'><fieldset><legend>Settings</legend><label for='rockHeightCoef'>Rock Height Coefficient (The smaller the number the higher the rock) [min: 1, max: 5]</label> <input id='rockHeightCoef' type='number' value='" + rc + "' min='1' max='5' /><br /><p>Choose rock texture</p><ul><li><input type='radio' name='texture' value='0'><img src='images/stone10.jpg' width='100' heigth='69' /></li><li><input type='radio' name='texture' value='1'><img src='images/stone11.jpg' width='100' heigth='69' /></li><li><input type='radio' name='texture' value='2'><img src='images/stone12.jpg' width='100' heigth='69' /></li><li><input type='radio' name='texture' value='3'><img src='images/stone13.jpg' width='100' heigth='69' /></li><li><input type='radio' name='texture' value='4'><img src='images/stone14.jpg' width='100' heigth='69' /></li><li><input type='radio' name='texture' value='5'><img src='images/stone15.jpg' width='100' heigth='69' /></li></ul><input type='submit' id='submitSettings' class='smallButton' value='Save Settings' /></fieldset></form></div>";

$(document).ready(
	function () {

	    loadGameMenu();

	    function loadGameMenu() {
	        $('body').append(gameMenuDOM).append(multiModalDOM).append(instructionsModalDOM).append(aboutUsModalDOM).append(settingsModalDOM);
	        $('#gameMenu').slideDown('slow');

	        $('#singleplayer').on('click', function () {
	            $('#gameMenu').slideUp('slow', function () {
	                $('.button').remove();
	                $('#gameMenu').append(singleDOM);
	                $('#gameMenu').slideDown('slow');

	                $('body').append(playVsTrollModalDOM);
	                $('body').append(challangeTrollModalDOM);

	                $('#playvsTroll').on('click', function () {

	                    generateModal('#playVsTrollOptions');

	                    $('#playVsTrollForm').submit(function (evt) {

	                        evt.preventDefault();

	                        var fieldSize = document.getElementById('pvtFieldSize');
	                        fieldSize = fieldSize.value;
	                        var columnMaxHeight = document.getElementById('pvtColumnMaxHeight');
	                        columnMaxHeight = columnMaxHeight.value;
	                        var maxTurns = document.getElementById('pvtMaxTurns');
	                        maxTurns = maxTurns.value;

	                        $.modal.close();

	                        $('#gameMenu').slideUp('slow', function () {
	                            $('body').empty();
	                            $('body').append(playVsTrollDOM);

	                            $('#turnsLeft').text(maxTurns);

	                            playVsTrollGame(fieldSize, columnMaxHeight, maxTurns);
	                        });

	                    });

	                });


	                $('#challangeTroll').on('click', function () {

	                    $('#fieldM').empty();

	                    generateModal('#challangeTrollOptions');

	                    $('#fieldGenerateButton').on('click', function (evt) {

	                        evt.preventDefault();

	                        $('#fieldM').empty();
	                        $('#ctPlayButton').remove();

	                        var fieldSize = document.getElementById('ctFieldSize');
	                        fieldSize = fieldSize.value;
	                        var columnMaxHeight = document.getElementById('ctColumnMaxHeight');
	                        columnMaxHeight = columnMaxHeight.value;
	                        var maxTurn = document.getElementById('ctMaxTurns');
	                        maxTurn = maxTurn.value;

	                        var fields = "";

	                        for (var i = 0; i < fieldSize; i++) {
	                            fields += "<tr>";
	                            for (var j = 0; j < fieldSize; j++) {
	                                fields += "<td><input type='number' min='0' value='0' max='" + columnMaxHeight + "' maxlength='2' /></td>"
	                            }
	                            fields += "</tr>"
	                        }

	                        $('#fieldM').append(fields);

	                        var pb = "<input type='submit' id='ctPlayButton' class='smallButton' value='Play' />";
	                        $('#challangeTrollForm').append(pb);

	                        $('#challangeTrollForm').submit(function (evt) {

	                            evt.preventDefault();

	                            var customField = [];

	                            var table = document.getElementById("fieldM");
	                            for (var i = 0, row; row = table.rows[i]; i++) {
	                                var cr = []
	                                for (var j = 0, col; col = row.cells[j]; j++) {
	                                    var v = col.firstChild;
	                                    v = v.value;
	                                    cr.push(parseInt(v));
	                                }
	                                customField.push(cr);
	                            }

	                            MainAlgo.init({ random: false, turns: maxTurn, size: fieldSize, field: customField });

	                            $('body').empty();
	                            $('body').append(challangeTrollDOM);

	                            challangeTroll(fieldSize, maxTurn, columnMaxHeight, customField, MainAlgo.result);

	                            $('#turnsLeft').text(app.param.turns);

	                            $('#prvButton').hide();
	                            $('#nxtButton').on('click', function () {
	                                //  console.log(app.currentTurn);
	                                app.playNextMove();
	                            });
	                            $('#prvButton').on('click', function () {
	                                app.playPreviousMove();

	                                //  console.log(app.currentTurn);
	                            });
	                            var pl = true;
	                            $('#autoplayButton').bind('click', function () {
	                                console.log(pl);
	                                if (pl) {
	                                    $('#autoplayButton').addClass('pause').text('pause');
	                                    si = setInterval(app.playNextMove.bind(app), 2000);
	                                    pl = !pl;
	                                }
	                                else {
	                                    $('#autoplayButton').removeClass('pause').text('autoplay');
	                                    console.log('clearing');
	                                    clearInterval(si);
	                                    pl = !pl;
	                                }
	                            });

	                        });
	                    });




	                    $('#ctPlayButton').on('click', function (evt) {

	                        evt.preventDefault();

	                        var fieldSize = document.getElementById('pvtFieldSize');
	                        fieldSize = fieldSize.value;
	                        var columnMaxHeight = document.getElementById('pvtColumnMaxHeight');
	                        columnMaxHeight = columnMaxHeight.value;
	                        var maxTurns = document.getElementById('pvtMaxTurns');
	                        maxTurns = columnMaxHeight.value;

	                        $.modal.close();

	                        $('#gameMenu').slideUp('slow', function () {
	                            $('body').empty();
	                            $('body').append(playVsTrollDOM);

	                            playVsTrollGame(fieldSize, columnMaxHeight, maxTurns);

	                            $('#turnsLeft').text(app.param.turns);

	                        });

	                    });

	                });




	                $('#backtomainmenu').on('click', function () {
	                    $('#gameMenu').slideUp('slow', function () {
	                        $('body').empty();
	                        loadGameMenu();
	                    });
	                })
	            });
	        });

	        $('#multiplayer').on('click', function () {

	            generateModal('#multiOptions');

	            $('#multiPlayerForm').submit(function (evt) {
	                evt.preventDefault();

	                var fieldSize = document.getElementById('fieldSize');
	                fieldSize = fieldSize.value;
	                var columnMaxHeight = document.getElementById('columnMaxHeight');
	                columnMaxHeight = columnMaxHeight.value;

	                $.modal.close();

	                $('#gameMenu').slideUp('slow', function () {
	                    $('body').empty();
	                    $('body').append(multiDOM);

	                    multiplayerGame(fieldSize, columnMaxHeight);
	                });

	            });
	        });

	        $('#instructionsButton').on('click', function () {
	            generateModal('#instructionsOptions');
	        });

	        $('#aboutUsButton').on('click', function () {
	            generateModal('#aboutUsOptions');
	        })

	        $('#settingsButton').on('click', function () {
	            generateModal('#settingsOptions');

	            $('#formSettings').submit(function (evt) {

	                evt.preventDefault();

	                var rhc = document.getElementById('rockHeightCoef');
	                rhc = parseInt(rhc.value);
	                localStorage.setItem('rochHeightCoef', rhc);

	                var txID = $('input:radio[name=texture]:checked').val() || 1;
	                localStorage.setItem('rockTexture', txID);

	                $.modal.close();

	            });

	        });

	        $('#exit').on('click', function () { window.close(); self.close(); })
	    }


	    function generateModal(el) {
	        $(el).modal({ onOpen: function (dialog) {
	            dialog.overlay.fadeIn('slow', function () {
	                dialog.data.hide();
	                dialog.container.fadeIn('slow', function () {
	                    dialog.data.slideDown('slow');
	                });
	            });
	        },
	            autoResize: true,
	            onClose: function (dialog) {
	                dialog.data.fadeOut('slow', function () {
	                    dialog.container.hide('slow', function () {
	                        dialog.overlay.slideUp('slow', function () {
	                            $.modal.close();
	                        });
	                    });
	                });
	            }
	        });
	    }

	    function multiplayerGame(fieldSize, columnMaxHeight) {
	        var container = document.getElementById("gameContex");
	        //	try {
	        var robotScoreContainer = document.getElementById("robotScore");
	        var trollScoreContainer = document.getElementById("trollScore");
	        var turnContainer = document.getElementById("onMove");
	        Sim.WebGLDetector.detectWebGL();
	        app = new GameOfTrolls();
	        app.init({ container: container,
	            fieldSize: fieldSize,
	            columnMaxHeight: columnMaxHeight,
	            generateRandomField: true,
	            multi: true,
	            enableInteraction: true,
	            vsTrollGame: false,
	            robotScoreContainer: robotScoreContainer,
	            trollScoreContainer: trollScoreContainer,
	            turnContainer: turnContainer
	        });

	        app.focus();
	        app.run();
	        $('#addTool').on('click', function (evt) {
	            evt.preventDefault();
	            $('#removeTool').removeClass('activeButton');
	            $('#addTool').addClass('activeButton');
	            app.addTool = true;

	        });
	        $('#removeTool').on('click', function (evt) {
	            evt.preventDefault();
	            $('#addTool').removeClass('activeButton');
	            $('#removeTool').addClass('activeButton');
	            evt.preventDefault(); app.addTool = false;
	        });
	    }

	    function playVsTrollGame(fieldSize, columnMaxHeight, turns) {
	        $('#turnsLeft').innerHTML = turns;
	        var container = document.getElementById("gameContex");
	        var turnLeft = document.getElementById("turnsLeft");
	        Sim.WebGLDetector.detectWebGL();
	        app = new GameOfTrolls();
	        app.init({ container: container,
	            fieldSize: fieldSize,
	            columnMaxHeight: columnMaxHeight,
	            turns: turns,
	            generateRandomField: true,
	            multi: false,
	            enableInteraction: true,
	            vsTrollGame: true,
	            turnsLeft: turns
	        });
	        app.focus();
	        app.run();
	        $('#addTool').on('click', function (evt) {
	            evt.preventDefault();
	            $('#removeTool').removeClass('activeButton');
	            $('#addTool').addClass('activeButton');
	            app.addTool = true;

	        });
	        $('#removeTool').on('click', function (evt) {
	            evt.preventDefault();
	            $('#addTool').removeClass('activeButton');
	            $('#removeTool').addClass('activeButton');
	            evt.preventDefault(); app.addTool = false;
	        });
	    }

	    function challangeTroll(fieldSize, turns, columnMaxHeight, field, turnsToPlay) {
	        var container = document.getElementById("gameContex");
	        var turnLeft = document.getElementById("turnsLeft");
	        Sim.WebGLDetector.detectWebGL();
	        app = new GameOfTrolls();
	        app.init({ container: container,
	            fieldSize: fieldSize,
	            columnMaxHeight: columnMaxHeight,
	            turns: turns,
	            generateRandomField: false,
	            multi: false,
	            enableInteraction: false,
	            trollPlaying: true,
	            turnsLeft: turnsLeft,
	            customField: field,
	            vsTrollGame: false,
	            turnsToPlay: turnsToPlay
	        });
	        app.focus();
	        app.run();
	    }
	}

);

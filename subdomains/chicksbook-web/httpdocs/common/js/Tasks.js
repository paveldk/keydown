﻿(function () {
    var i;
    var _round = Math.round;
    Math.round = function (number, decimals /* optional, default 0 */) {
        if (arguments.length == 1)
            return _round(number);

        var multiplier = Math.pow(10, decimals);
        return _round(number * multiplier) / multiplier;
    }
    Tasks = function (param) {
        this.user = param.user;
        this.$tasksList = param.tasksList;
        this.compTaskClass = param.compTaskClass;
        this.uncompTaskClass = param.uncompTaskClass;

        this.$modal = param.modal;
    };
    Tasks.prototype = {
        init: function () {
        },
        displayDailyTasks: function () {

			$(document.documentElement).removeClass(SiteController.PAGE_CLASS_NAME);
			SiteController.PAGE_CLASS_NAME = "tasks-page";
			$(document.documentElement).addClass(SiteController.PAGE_CLASS_NAME);

            SiteController.$MAIN_CONTAINER.children().fadeOut('fast');
            this.loadTasksList();
        },

        loadTasksList: function () {
            var userData = { "sessionId": this.user.sessionId };
            var that = this;
            $.ajax({
                type: 'POST',
                url: SiteController.SERVICE_URL + "Tasks/GetDailyTasksByUser",
                crossDomain: true,
                data: userData,
                dataType: 'json',
                success: function (r, textStatus, jqXHR) {

                    that.$tasksList.empty();

                    for (i = 0; i < r.UncompletedTasks.length; i++) {
                        that.$tasksList.append(that.generateTaskCode(r.UncompletedTasks[i], that.uncompTaskClass));
                    }
                    for (i = 0; i < r.CompletedTasks.length; i++) {
                        that.$tasksList.append(that.generateTaskCode(r.CompletedTasks[i], that.compTaskClass));
                    }
                    that.$tasksList.fadeIn('slow');

                },
                error: function (responseData, textStatus, errorThrown) {
                    siteController.checkInvalidSession(responseData);
                }
            });
        },

        generateTaskCode: function (task, className) {
            var time;
            if (task.IsTimed == true) {
                time = " - " + task.Time;
            }
            else time = "";
            return "<li class='item task " + className + "'><h2 class='title'>" + task.Name + time + "</h2><div class='body'><p>" +
                task.Description + "</p><span hidden>" + task.Id + "</span><em hidden>"+ task.TaskId +"</em></div></li>";
        },
        attachTasksClicks: function () {
            var that = this;

            this.$tasksList.on("click", "li", function () {
                $("#modalContent").empty();
                $("#modalContent").html($(this).html());
                $("#modalTitle").html("Task Information");
                //logic for task ID - show nearby shops... show nearby vets...
                var taskID = parseInt($($(this).find("span[hidden]")[0]).text());
                var tId = parseInt($($(this).find("em[hidden]")[0]).text());
                if (tId == 9) {
                    if ($(this).hasClass(that.compTaskClass)) {
                        $("#modalContent").append(
							[
								"<div class='buttons modalButtonsHolder'>",
									"<a href='#' class='button primary nearby' id='showNearbyVets'>Show Nearby Vets</a>",
									"<a href='#' class='button' id='cancelModal'>Cancel</a>",
								"</div>"
							].join("")
						);
                    }
                    else {
                        $("#modalContent").append(
							[
								"<div class='buttons modalButtonsHolder'>",
									"<a href='#' class='button primary nearby' id='showNearbyVets'>Show Nearby Vets</a>",
									"<a href='#' class='button tsk' data-taskid='" + taskID + "'>Mark As Done</a>",
									"<a href='#' class='button' id='cancelModal'>Cancel</a>",
								"</div>"
							].join("")
						);
                    }
                }
                else if (tId == 11) {
                    if ($(this).hasClass(that.compTaskClass)) {
                        $("#modalContent").append(
							[
								"<div class='buttons modalButtonsHolder'>",
									"<a href='#' class='button primary nearby' id='showNearbyPets'>Show Nearby Pet Shops</a>",
									"<a href='#' class='button' id='cancelModal'>Cancel</a>",
								"</div>"
							].join("")
						);
                    }
                    else {
                        $("#modalContent").append(
							[
								"<div class='buttons modalButtonsHolder'>",
									"<a href='#' class='button primary nearby' id='showNearbyPets'>Show Nearby Pet Shops</a>",
									"<a href='#' class='button primary tsk' data-taskid='" + taskID + "'>Mark As Done</a>",
									"<a href='#' class='button' id='cancelModal'>Cancel</a>",
								"</div>"
							].join("")
						);
                    }
                }
                else {
                    if ($(this).hasClass(that.compTaskClass)) {
                        $("#modalContent").append(
							[
								"<div class='buttons modalButtonsHolder'>",
									"<a href='#' class='button' id='cancelModal'>Cancel</a>",
								"</div>"
							].join("")
						);
                    }
                    else {
                        $("#modalContent").append(
							[
								"<div class='buttons modalButtonsHolder'>",
									"<a href='#' class='button primary tsk' data-taskid='" + taskID + "'>Mark As Done</a>",
									"<a href='#' class='button' id='cancelModal'>Cancel</a>",
								"</div>"
							].join("")
						);
                    }
                }
                that.$modal.show();
            });
            this.$modal.on("click", "a.tsk", function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
                that.markTaskAsCompleted($(this).data('taskid'));
            });

            that.$modal.on("click", "#showNearbyVets", function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
                that.displayNearbyVets();
            });

            that.$modal.on("click", "#showNearbyPets", function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
                that.displayNearbyPets();
            });

        },
        markTaskAsCompleted: function (taskId) {
            var that = this;
            var userData = { "taskId": taskId, "sessionId": this.user.sessionId };
            $.ajax({
                type: 'POST',
                url: SiteController.SERVICE_URL + "Tasks/MarkTaskCompleted",
                crossDomain: true,
                data: userData,
                dataType: 'json',
                success: function (r, textStatus, jqXHR) {
                    that.loadTasksList();
                    that.$modal.fadeOut('fast');
                },
                error: function (responseData, textStatus, errorThrown) {
                    siteController.checkInvalidSession(responseData);
                }
            });
        },
        displayNearbyVets: function () {
            var that = this;
            var userData = { "sessionId": this.user.sessionId };
            $.ajax({
                type: 'POST',
                url: SiteController.SERVICE_URL + "PetVetShops/GetNearbyVets",
                crossDomain: true,
                data: userData,
                dataType: 'json',
                success: function (r, textStatus, jqXHR) {

                    that.generateVetsList(r);
                },
                error: function (responseData, textStatus, errorThrown) {
                    siteController.checkInvalidSession(responseData);
                }
            });
        },
        generateVetsList: function (r) {
            var list = "<div class='body'><ul class='list'>";
            for (i = 0; i < r.length; i++) {
                list += "<li><h2 class='sub'>" + r[i].Name + "</h2><h3>Distance: " + Math.round(r[i].DistanceFromUser, 2) +" miles</h3><p>Address: " + r[i].Address + "</p><p>Phone: " + r[i].Phone + "</p></li>";
            }
            list += "</ul></div>";

            $("#modalContent").empty().append(list);
        },
        displayNearbyPets: function () {
            var that = this;
            var userData = { "sessionId": this.user.sessionId };
            $.ajax({
                type: 'POST',
                url: SiteController.SERVICE_URL + "PetVetShops/GetNearbyPetShops",
                crossDomain: true,
                data: userData,
                dataType: 'json',
                success: function (r, textStatus, jqXHR) {

                    that.generatePetsList(r);
                },
                error: function (responseData, textStatus, errorThrown) {
                    siteController.checkInvalidSession(responseData);
                }
            });
        },
        generatePetsList: function (r) {
            var list = "<div class='body'><ul class='list'>";
            for (i = 0; i < r.length; i++) {
                list += "<li><h2 class='sub'>" + r[i].Name + "</h2><h3>Distance: " + Math.round(r[i].DistanceFromUser, 2) +" miles</h3><p>Address: " + r[i].Address + "</p><p>Phone: " + r[i].Phone + "</p> \
                        <table class='grid'> \
                            <tr> \
                                <td>Monday</td><td>" + r[i].MonStart + " - " + r[i].MonEnd + "</td> \
                            </tr> \
                            <tr> \
                                <td>Tuesday</td><td>" + r[i].TueStart + " - " + r[i].TueEnd + "</td> \
                            </tr> \
                            <tr> \
                                <td>Wednesday</td><td>" + r[i].WedStart + " - " + r[i].WedEnd + "</td> \
                            </tr> \
                            <tr> \
                                <td>Thursday</td><td>" + r[i].ThuStart + " - " + r[i].ThuEnd + "</td> \
                            </tr> \
                            <tr> \
                                <td>Friday</td><td>" + r[i].FriStart + " - " + r[i].FriEnd + "</td> \
                            </tr> \
                            <tr> \
                                <td>Saturday</td><td>" + r[i].SatStart + " - " + r[i].SatEnd + "</td> \
                            </tr> \
                            <tr> \
                                <td>Sunday</td><td>" + r[i].SunStart + " - " + r[i].SunEnd + "</td> \
                            </tr> \
                        </table></li>";
            }
            list += "</ul></div>";

            $("#modalContent").empty().append(list);
        }

    }
})(jQuery);
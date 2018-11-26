var main = {
    alert: function (message, callback) {
        $("#weui_alert").find('.alert-content').html(message);
        $("#weui_alert").find(".weui-dialog__btn_primary").unbind('click').bind('click', function () {
            if (typeof callback == 'function') {
                callback(true)
            } else {
                $("#weui_alert").fadeOut(200);
            }
        })
        $("#weui_alert").fadeIn(200);
    },
    loading: function (type, message) {
        if (message) {
            $("#weui_loading").find('.weui-toast__content').html(message);
        }
        if (type == 'hide') {
            $("#weui_loading").hide();
        } else {
            $("#weui_loading").show();
        }
    },
    toast: function (message, timeout) {
        $("#weui_toast").find('.weui-toast__content').html(message);
        $("#weui_toast").fadeIn(200);
        timeout = timeout ? timeout : 3000;
        setTimeout(function () {
            $("#weui_toast").fadeOut(200);
        }, timeout)
    },
    dialog: function (message, callback) {
        $("#weui_dialog").find(".weui-dialog__bd").html(message);
        $("#weui_dialog").find(".weui-dialog__btn_primary").unbind('click').bind('click', function () {
            if (typeof callback == 'function') {
                $("#weui_dialog").fadeOut(200);
                callback(true)
            } else {
                $("#weui_dialog").fadeOut(200);
            }
        })
        $("#weui_dialog").find(".weui-dialog__btn_default").unbind('click').bind('click', function () {
            $("#weui_dialog").fadeOut(200);
        })
        $("#weui_dialog").fadeIn(200);
    },
    back: function () {
        window.history.go(-1);
    },
    go: function (target) {
        var url = $(target).attr('data-href');
        window.location.href = url;
    },
    showMore: function () {
        $("#actionsheet").find('.weui-actionsheet').addClass('weui-actionsheet_toggle');
        $("#actionsheet").find('.weui-mask').show();
        $("#actionsheet").find('.weui-actionsheet-cancel').unbind('click').bind('click', function () {
            $("#actionsheet").find('.weui-actionsheet').removeClass('weui-actionsheet_toggle');
            $("#actionsheet").find('.weui-mask').hide();
        })
    },
    showSearch: function (e) {
        $(e).find('.weui-search-bar__label').css({'z-index': 0});
        $(e).find('.vux-search-mask').css({'z-index': 0});
        $(e).find('.weui-search-bar__box').css({'z-index': 100});
        $(e).next('.weui-search-bar__cancel-btn').show();
    }
}

$(function () {
    $(".weui-icon-clear").click(function () {
        $(this).parents('.weui-cell__ft').siblings('.weui-cell__bd').find('input').val('');
    })
})

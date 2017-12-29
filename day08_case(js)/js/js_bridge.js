(
    function(i) {
        var n = 1;
        var r = {
            IDLE: 1,
            READY: 2,
            ERROR: 3
        };
        var h = {
            METHOD_NOT_FOUND: 1,
            PERMISSION_DENY: 2,
            RSPDATA_FORMAT_ERR: 3,
            CALL_NATIVE_TIMEOUT: 4,
            REQ_PARAM_INVALID: 5,
            NATIVE_CODE_EXCEPTION: 100,
            USER_NOT_LOGIN: 101,
            USER_LOGIN: 102
        };
        var b = 3000;
        var d = {};
        var j;
        var s = false;
        var f = r.IDLE;
        var u = t(navigator.userAgent);

        function t(v) {
            if (v.match(/iPhone/i)) {
                return "iph"
            }
            if (v.match(/iPod/i)) {
                return "iph"
            }
            if (v.match(/iPad/i)) {
                return "ipd"
            }
            return "aph"
        }
        function l(w, v) {
            if (!v) {
                return
            }
            if (w == "openNativePage") {
                if (v.pageUrl) {
                    v.pageUrl = m(v.pageUrl)
                }
            }
        }
        function e(z, y) {
            if ((i.ppexternal && ppexternal.callFunc && u == "aph") || u == "ipd" || u == "iph") {
                var x = c();
                if (!y) {
                    y = {}
                }
                var v = {
                    success: y.success,
                    error: y.error,
                    cancel: y.cancel,
                    instance: y
                };
                for (var w in y) {
                    if (y[w] instanceof Function) {
                        delete y[w]
                    }
                }
                d[x] = v;
                if (y.timeout && y.timeout instanceof Number) {
                    setTimeout(function() {
                        var A = d[x];
                        if (!A) {
                            return
                        }
                        delete d[x];
                        if (A.error) {
                            A.error.call(A.instance, h.CALL_NATIVE_TIMEOUT, "调用超时")
                        }
                    }, y.timeout)
                }
                if (u == "aph") {
                    ppexternal.callFunc(x, z, JSON.stringify(y))
                } else {
                    o("http://jssdk_callFunc?eventId=" + x + "&funcName=" + encodeURIComponent(z) + "&params=" + encodeURIComponent(JSON.stringify(y)))
                }
            }
        }
        function c() {
            function v() {
                return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1)
            }
            return v() + v() + "_" + v() + "_" + v() + "_" + v() + "_" + v() + v() + v()
        }
        i.ppsdk = {
            __readyFunc: null,
            __errorFunc: null,
            _init: function(A, v, x) {
                if (f == r.IDLE) {
                    u = v;
                    try {
                        var B = JSON.parse(x)
                    } catch (z) {
                        f = r.READY;
                        s = false;
                        g();
                        if (ppsdk.__readyFunc) {
                            ppsdk.__readyFunc()
                        }
                        return
                    }
                    for (var w = 0; w < B.length; w++) {
                        var y = B[w];
                        ppsdk[y] = (function(C) {
                            return (function(D) {
                                if (f == r.READY) {
                                    l(C, D);
                                    e(C, D)
                                } else {
                                    D.error(h.PERMISSION_DENY, "接口未授权")
                                }
                            })
                        })(y)
                    }
                    f = r.READY;
                    s = true;
                    if (ppsdk.__readyFunc) {
                        ppsdk.__readyFunc()
                    }
                }
            },
            _emit: function(A, y, x) {
                var v = d[y];
                if (v != null) {
                    delete d[y];
                    if (v[A]) {
                        try {
                            var w = JSON.parse(x)
                        } catch (z) {
                            if (v.error && A == "success") {
                                v.error.call(v.instance, h.RSPDATA_FORMAT_ERR, "返回数据格式错误");
                                return
                            }
                            w = {}
                        }
                        if (A == "error") {
                            v.error.call(v.instance, w.errorCode, w.errorMsg)
                        } else {
                            v[A].call(v.instance, w)
                        }
                    }
                }
            },
            ready: function(v) {
                ppsdk.__readyFunc = v;
                if (f == r.READY) {
                    v()
                }
            },
            error: function(v) {
                ppsdk.__errorFunc = v
            },
            config: function(v) {
                if ((i.ppexternal && ppexternal.onJsSdkLoaded && u == "aph") || u == "ipd" || u == "iph") {
                    if (u == "aph") {
                        ppexternal.onJsSdkLoaded(n)
                    } else {
                        o("http://jssdk_onJsSdkLoaded?jsVersion=" + n)
                    }
                    setTimeout(function() {
                        if (f == r.IDLE) {
                            f = r.READY;
                            s = false;
                            g();
                            if (ppsdk.__readyFunc) {
                                ppsdk.__readyFunc()
                            }
                        }
                    }, b)
                } else {
                    f = r.READY;
                    s = false;
                    g();
                    if (ppsdk.__readyFunc) {
                        ppsdk.__readyFunc()
                    }
                }
            },
        };

        function p(w) {
            var A = /^([^:]+):\/\/([0-9a-zA-Z_\.]+)(?::(\d+))?(\/[0-9a-zA-Z_\/]*)?(?:\?((?:[^=&#\?]+=[^&#\?]*)?(?:(?:&[^=&#\?]+=[^&#\?]*)*)))?(?:#((?:[^=&#\?]+=[^&#\?]*)?(?:(?:&[^=&#\?]+=[^&#\?]*)*)))?$/;
            var B = A.exec(w);
            if (B == null) {
                B = []
            }
            var y = {};
            if (B[5]) {
                var z = B[5];
                var x = /([^=&]+)=([^&]*)/g;
                var v;
                while ((v = x.exec(z)) !== null) {
                    if (v && v.length == 3 && v[1]) {
                        y[v[1]] = decodeURIComponent(v[2] ? v[2] : "")
                    }
                }
            }
            console.info(B);
            return {
                url: w,
                getSchema: function() {
                    return B[1] || ""
                },
                getHost: function() {
                    return B[2] || ""
                },
                getPort: function() {
                    return B[3] || 80
                },
                getPath: function() {
                    return B[4] || ""
                },
                getQueryStr: function() {
                    return B[5] || ""
                },
                getQueryParameter: function(C) {
                    return y[C]
                }
            }
        }
        function g() {
            for (var v in q) {
                ppsdk[v] = q[v]
            }
            if (!u) {
                u = t(navigator.userAgent)
            }
        }
        function o(v) {
            var w = document.createElement("IFRAME");
            w.setAttribute("src", v);
            document.documentElement.appendChild(w);
            w.parentNode.removeChild(w);
            w = null
        }
        function a(y) {
            var A = p(y);
            if (A.getSchema() == "pptv") {
                var x = "";
                var z = A.getQueryParameter("type");
                var w = A.getQueryParameter("sid");
                var v = A.getQueryParameter("vid");
                if (z == "ppvod") {
                    x += "vod://";
                    var B = (w ? w : v);
                    if (B) {
                        x += B;
                        if (v) {
                            x += "?apppid=" + v
                        }
                        return x
                    }
                } else {
                    if (z == "pplive2") {
                        x += "live://";
                        var B = (w ? w : v);
                        if (B) {
                            x += B;
                            return x
                        }
                    }
                }
                return null
            }
        }
        function m(w) {
            var v = p(w);
            var x = v.getSchema() + "://" + u + ".pptv.com" + v.getPath();
            if (v.getQueryStr()) {
                x += "?" + v.getQueryStr()
            }
            return x
        }
        function k(v) {
            var v = v.content;
            if (Object.keys(v).length == 0) {
                return v
            }
            if (v.userprofile) {
                v.isLogin = true;
                v.userName = v.userprofile.username;
                v.nickname = v.userprofile.nickname
            } else {
                var w = {};
                w.isLogin = true;
                w.userName = decodeURIComponent(v.username);
                w.nickname = decodeURIComponent(v.nickname);
                w.PPKey = v.PPKey;
                w.PPName = v.PPName;
                w.UDI = v.UDI;
                w.blogbound = [];
                w.token = v.token;
                var x = {};
                x.city = decodeURIComponent(v.city);
                x.createtime = decodeURIComponent(v.createTime);
                x.facepic = decodeURIComponent(v.facePic);
                x.birthday = decodeURIComponent(v.birthday.replace(/\+/g, "%20"));
                x.username = decodeURIComponent(v.username);
                x.level = v.level;
                x.status = v.status;
                x.nickname = decodeURIComponent(v.nickname);
                x.province = decodeURIComponent(v.province);
                x.gender = v.gender;
                x.experience = v.experience;
                x.credit = v.credit;
                x.gradename = decodeURIComponent(v.gradeName);
                w.userprofile = x;
                v = w
            }
            return v
        }
        var q = {
            getDeviceInfo: function(v) {
                if (!v || !v.success) {
                    return
                }
                if (i.external && external.currentDeviceInfo) {
                    var w = "ppsdk_cb_" + c();
                    i[w] = function(x) {
                        try {
                            var B = JSON.parse(x);
                            if (B.content) {
                                var z = B.code || parseInt(B.content.code);
                                var y = B.message || B.content.message
                            } else {
                                var z = B.code || -1;
                                var y = B.message || ""
                            }
                            if (z === 1) {
                                B = B.content;
                                if (B) {
                                    B.uuid = B.udid || "";
                                    B.osver = B.osv || "";
                                    delete B.osv;
                                    B.o = B.tunnel || "";
                                    delete B.tunnel;
                                    B.appver = B.appv || "";
                                    delete B.appv;
                                    B.appplt = B.ostype || "";
                                    delete B.appplt;
                                    delete B.code;
                                    delete B.message;
                                    v.success(B)
                                } else {
                                    v.success({})
                                }
                            } else {
                                v.error(h.NATIVE_CODE_EXCEPTION, y)
                            }
                        } catch (A) {
                            if (v.error) {
                                v.error(h.RSPDATA_FORMAT_ERR, "json格式错误")
                            }
                        }
                        delete i[w]
                    };
                    external.currentDeviceInfo(w)
                } else {
                    v.error && v.error(h.METHOD_NOT_FOUND, "方法不存在")
                }
            },
            getUserInfo: function(v) {
                if (!v || !v.success) {
                    return
                }
                if (i.external && external.currentUserInfo) {
                    var w = "ppsdk_cb_" + c();
                    i[w] = function(A) {
                        try {
                            var x = JSON.parse(A);
                            var y = parseInt(x.code);
                            if (y === 1) {
                                x = k(x);
                                if (x) {
                                    v.success(x)
                                } else {
                                    v.success({})
                                }
                            } else {
                                v.error && v.error(h.NATIVE_CODE_EXCEPTION, x.message)
                            }
                        } catch (z) {
                            if (v.error) {
                                v.error(h.RSPDATA_FORMAT_ERR, "json格式错误")
                            }
                        }
                        delete i[w]
                    };
                    external.currentUserInfo(w)
                } else {
                    v.error && v.error(h.METHOD_NOT_FOUND, "方法不存在")
                }
            },
            login: function(w) {
                if (!w || !w.success) {
                    return
                }
                var v = w.autologin || false;
                if (i.external && (!v && external.userLogin) || (v && external.userBackLogin)) {
                    var x = "ppsdk_cb_" + c();
                    i[x] = function(B) {
                        if (v && u == "iph") {
                            if (B == "1") {
                                w.success({})
                            } else {
                                w.error(h.NATIVE_CODE_EXCEPTION, "自动登录失败")
                            }
                            return
                        }
                        try {
                            var y = JSON.parse(B);
                            var z = parseInt(y.code);
                            if (z === 1) {
                                y = k(y);
                                if (y) {
                                    w.success(y)
                                } else {
                                    w.success({})
                                }
                            } else {
                                w.error(h.NATIVE_CODE_EXCEPTION, y.message)
                            }
                        } catch (A) {
                            if (w.error) {
                                w.error(h.RSPDATA_FORMAT_ERR, "json格式错误")
                            }
                        }
                        delete i[x]
                    };
                    if (v) {
                        external.userBackLogin(x)
                    } else {
                        external.userLogin(x)
                    }
                } else {
                    w.error && w.error(h.METHOD_NOT_FOUND, "方法不存在")
                }
            },
            playVideo: function(w) {
                if (!w) {
                    return
                }
                var x = w.playlink;
                if (/^(vod|live):\/\//.test(x)) {
                    o(x);
                    w.success && w.success({});
                    return
                } else {
                    if (/^pptv:\/\//.test(x)) {
                        var v = a(x);
                        if (v) {
                            o(v);
                            w.success && w.success({});
                            return
                        }
                    }
                }
                w.error && w.error(h.REQ_PARAM_INVALID, "请求参数错误")
            },
            share: function(v) {
                if (!v) {
                    v = {}
                }
                if (i.external && external.socialShare) {
                    var w = "ppsdk_cb_" + c();
                    i[w] = function(z) {
                        try {
                            var x = JSON.parse(z);
                            code = parseInt(x.code);
                            if (code === 1) {
                                x = x.content;
                                if (x) {
                                    v.success && v.success(x)
                                } else {
                                    v.success && v.success({})
                                }
                            } else {
                                v.error(h.NATIVE_CODE_EXCEPTION, x.message)
                            }
                        } catch (y) {
                            if (v.error) {
                                v.error(h.RSPDATA_FORMAT_ERR, "json格式错误")
                            }
                        }
                        delete i[w]
                    };
                    external.socialShare(JSON.stringify({
                        shareText: v.shareText,
                        shareURL: v.shareURL,
                        shareImageURL: v.shareImageURL
                    }), w)
                } else {
                    v.error && v.error(h.METHOD_NOT_FOUND, "方法不存在")
                }
            },
            sendSMS: function(v) {
                if (!v) {
                    v = {}
                }
                if (i.external && external.sendSMS) {
                    var w = "ppsdk_cb_" + c();
                    i[w] = function(A) {
                        if (A == 1) {
                            v.success && v.success({});
                            return
                        } else {
                            if (A == 0) {
                                v.error && v.error(h.NATIVE_CODE_EXCEPTION, "发送失败");
                                return
                            }
                        }
                        try {
                            var y = JSON.parse(A);
                            var x = parseInt(y.code);
                            if (x === 1) {
                                y = y.content;
                                if (y) {
                                    v.success && v.success(y)
                                } else {
                                    v.success && v.success({})
                                }
                            } else {
                                v.error && v.error(h.NATIVE_CODE_EXCEPTION, y.message)
                            }
                        } catch (z) {
                            v.error && v.error(h.RSPDATA_FORMAT_ERR, "json格式错误")
                        }
                        delete i[w]
                    };
                    external.sendSMS(v.to || "", v.content || "", w)
                } else {
                    v.error && v.error(h.METHOD_NOT_FOUND, "方法不存在")
                }
            },
            openNativePage: function(w) {
                if (!w) {
                    w = {}
                }
                if (i.external && external.openAppPage && w.pageUrl) {
                    var x = "ppsdk_cb_" + c();
                    i[x] = function(y) {
                        w.success && w.success({});
                        delete i[x]
                    };
                    var v = m(w.pageUrl);
                    external.openAppPage(v, x)
                } else {
                    w.error && w.error(h.METHOD_NOT_FOUND, "方法不存在")
                }
            }
        }
    })(window);
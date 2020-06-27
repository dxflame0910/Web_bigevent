$(function () {
    $('#link_reg').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    var form = layui.form;
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须在6-12位，且非空格'
        ],
        // repwd: function (value) {
        //     const pwd = $('.reg-box[name=password]').val()
        //     if (value !== pwd) {
        //         return '两次密码输入的不一致'
        //     }
        // }

        repwd: function (value) {
            const pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码时输入的不一致'
            }
        }
    })

    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        const inputparmas = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', inputparmas, function (res) {
            if (res.status !== 0) {
                return layer.msg('用户名被占用')
            }
            layer.msg('注册成功');
            $('#link_reg').click()
        })
    })


    $('#form_login').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            type: 'post',
            data: $(this).serialize(),
            url: '/api/login',
            success: function (res) {
                // console.log(res.token)
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = 'index.html'
            }
        })
    })
})
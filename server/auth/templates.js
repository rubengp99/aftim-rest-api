
function getForgotTemplate(name, hash) {
    //TODO, NEW TEMPLATE
    return  `
    <html>
        <head>
            <title>Forget Password Email</title>
        </head>

        <body>
            <div>
                <h3>Dear ${name}</h3>
                <p>You requested for a password reset, your reset code is:</p>
                <div>${hash}<div>
                <br>
            </div>
        </body>
    </html>
    `;
}

Slooow.initSesionState = function (game) {
    var buttonInitSesion = undefined
    var textButtonInit = undefined
    var inicioSesionNameButton = undefined
    var inicioSesionPassButton = undefined
}

Slooow.initSesionState.prototype = {

    init: function () {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **INITSESION** state");
        }
    },

    preload: function () {

    },

    // Escribimos nombre y contraseña para el jugador y mandamos mensaje al
    // servidor para que lo compruebe
    create: function () {
        // BackGround
        
	    b = game.add.image (game.world.centerX, game.world.centerY, 'background')
		b.anchor.set (0.5, 0.5)
		b.scale.setTo (1.2,1.2)
		/*
		// Window
		var window = game.add.image (game.world.centerX, game.world.centerY, 'window')
		window.scale.setTo(0.65, 0.65)
		window.anchor.set(0.5, 0.5)
		
		// Logo y Nombre
		var logo = game.add.image (game.world.centerX, game.world.centerY - 200, 'logo')
		logo.scale.setTo(0.5, 0.5)
		logo.anchor.set(0.5, 0.5)
		
		var style = {
			font : "bold 40px Impact",
			fill : "#ffffff",
			align : "center"
		};
		/*var text = game.add.text(game.world.centerX, game.world.centerY - 200,
				'Slooow GAME', style)
		text.anchor.set(0.5)
		*/
        // Boton Username
        inicioSesionNameButton = game.add.inputField(game.world.centerX - 160,
            game.world.centerY - 100, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 30,
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Username'
        });

        // Boton PassWord
        inicioSesionPassButton = game.add.inputField(game.world.centerX - 160,
            game.world.centerY - 30, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 30,
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Password',
            type: PhaserInput.InputType.password
        });

        // Init Session Button
        var style2 = {
            font: "40px Arial",
            fill: "#000000",
            align: "center"
        };

        game.global.input2 = game.add.inputField(game.world.centerX - 480,
            game.world.centerY + 175, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 20,
            width: 580,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Click'
        });
        this.escKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.ENTER);


		/*
		buttonInitSesion = game.add.button(game.world.centerX,
				game.world.centerY + 100, 'button1', actionOnClick, this,
				0, 0, 0)
		buttonInitSesion.anchor.set(0.5)
		textButtonInit = game.add.text(game.world.centerX,
				game.world.centerY + 100, 'Iniciar Sesion', style2)
		textButtonInit.anchor.set(0.5)
		
		textButtonInit.alpha = 0.5
		buttonInitSesion.alpha = 0.5
		
		textButtonInit.scale.setTo(0.5,0.5)
		buttonInitSesion.scale.setTo(0.5,0.5)
		
		function actionOnClick() {
			if (inicioSesionNameButton.value !== undefined && inicioSesionPassButton.value !== undefined) {
				if (inicioSesionNameButton.value.length !== 0 && inicioSesionPassButton.value.length !== 0) {
					let msg = {
						event : 'NAME AND PASSWORD',
						name : inicioSesionNameButton.value,
						pass : inicioSesionPassButton.value
					}
					game.global.socket.send(JSON.stringify(msg))
					inicioSesionNameButton.text.setText('')
					inicioSesionNameButton.value = undefined
					inicioSesionPassButton.text.setText('')
					inicioSesionPassButton.value = undefined
				}
			}
		}*/
    },

    update: function () {
        if (game.global.input2.value !== undefined) {
            if (this.escKey.justDown
                && game.global.input2.value.length !== 0) {

                let msg = {
                    event: 'SINGLEPLAYER',
                    playerName: game.global.input2.value,
                    roomName: 'sala1'
                }
                game.global.socket.send(JSON.stringify(msg))
                game.global.input2.text.setText('')
                game.global.input2.value = undefined

               
                game.state.start('singlePlayerState')
                
            }
        }
               

    }
    /*if (inicioSesionNameButton.value !== undefined && inicioSesionPassButton.value !== undefined){
        if (inicioSesionNameButton.value.length !== 0 && inicioSesionPassButton.value.length !== 0){
            textButtonInit.alpha = 1
            buttonInitSesion.alpha = 1
        }else {
            textButtonInit.alpha = 0.5
            buttonInitSesion.alpha = 0.5
        }
    }*/
}

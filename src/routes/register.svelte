<script>
    //Importamos la funcion de registro de usuario AUTH
   import {auth} from "../firebase";
   import { db } from "../firebase"

    let email = ''//Email del usuario
    let password = ''//Password del usuario
    let confirm = ''//Confirmar password
    let username = ''//nombre del usuario
    const register = async () =>{//Funcion de registro de usuario
        try{
            if(password == confirm){
                await auth.createUserWithEmailAndPassword(email,password)
                
                let user = auth.currentUser

                await user.updateProfile({
                    displayName:username
                }).then(() =>{
                    console.log("Nombre de usuario registrado correctamente")
                }).catch((error) =>{
                    console.log(error)
                })

                let usuario ={
                    correo: user.email,
                    id: user.uid,
                }
                await db.collection('usuarios/').doc().set(usuario);

                //Mensaje de validacion
                console.log("Usuario creado")
                

                ///REDIRECCIONAMIENTO A PERFIL
                window.history.pushState('', '', '/profile');
                location.reload();
            }else{
                console.log("CONTRASENIAS DIFERENTES")
            }
        } catch(error){
            //En caso de error al registrarse...
            console.log(error.code);
            console.log(error.message);
        }
    }
</script>

<!--Formulario de registro-->
<div class="container">
    <img src="/img/bg_1.jpg" alt="">
    <form on:submit|preventDefault={register}>
        <div>
            <h4>Registro</h4>
            <p><a href="/login">Entra</a> o reg&iacute;strate para poder crear, clasificar, comentar o guardar recetas</p>
            <label for="mail"> <span> Correo Electr&oacute;nico:</span></label>
            <input type="text" name="mail" bind:value={email}>
            <label for="password"> <span> Contrase&ntilde;a:</span></label>
            <input type="password" name="password" bind:value={password}>
            <label for="confirm"> <span> Confirmar contrase&ntilde;a:</span></label>
            <input type="password" name="confirm" bind:value={confirm}>
            <label for="mail"> <span> Nombre de usuario:</span></label>
            <input type="text" bind:value={username}>
            <p>www.recipetime.netlify.app/usuario/</p>
            <p>Se usa la direcci&oacute;n para tu p&aacute;gina de usuario, pi&eacute;nsalo bien porque no podr&aacute;s cambiarlo.</p>
            <div class="terms-box">
                <input type="checkbox" name="terms" >
                <label for="terms" id="terms">He le&iacute;do y acepto la <a href="/">pol&iacute;tica de privacidad y participaci&oacute;n.</a></label>
            </div>
            <br>
            <button>Registrar</button>
        </div>
    </form>
</div>

<style lang="scss">
.container{
    display: flex;
    flex-direction: column;
    height: calc(100vh - 65px);
    img{
        width: 100%;
        height: 100%;
        min-height: 250px;
        overflow: hidden;
        object-fit: cover;
        object-position: center;
        border-bottom: solid 2px #f05a28;
    }
    form{
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        p{
            font-size: 12px;
            &:first-of-type{
                margin-bottom: 5px;
            }
        }
        a{
            color: #f05a28;
        }
        div{
            display: flex;
            flex-direction: column;
            max-width: 320px;
            padding: 20px;
            h4{
                color: #f05a28;
                font-size: 2em;
                margin-bottom: 10px;
            }
            label{
                font-weight: bold;
                color: #f05a28;
                display: block;
                position: relative;
                z-index: 1;
                margin-left: 10px;
                span{
                    background: white;
                    padding: 2px 10px;
                }
                #terms{
                    display: inline;
                    color: black;
                }
            }
            .terms-box{
                padding: 10px 0;
                flex-direction: row;
                flex-wrap: nowrap;
                font-size: 12px;
                
            }
            button {
                background-color: #f05a28;
                border: solid 2px #f05a28;
                border-radius: 20px;
                padding: 10px;
                text-transform: uppercase;
                font-weight: bold;
                color: white;
                cursor: pointer;
                transition: all .2s;
                &:hover{
                    background-color: white;
                    color: #f05a28;
                }
            }
        }
        input{
            border: dashed 2px #f05a28;
            border-radius: 20px 20px 0 0;
            padding: 15px 10px 10px;
            outline: none;
            position: relative;
            margin-top: -10px;
            margin-bottom: 5px;
        }
    }
    $breakpoint-tablet: 768px;
    @media (min-width: $breakpoint-tablet) {
        flex-direction: row;
        img{
           border-bottom: none;
           border-right: solid 2px #f05a28; 
        }
        form{
            width: 100%;
        }
    }
}
    
</style>

<script>
    //Importamos la funcion para hacer el inicio de sesion
    import {activeSesion} from '../store';
    import {auth} from '../firebase'
    

    let email ='';//Email del usuario
    let password = '';//Password del usuario

    const login = async () =>{//Funcion de registro de usuario

        try{
            if(!$activeSesion){
                await auth.signInWithEmailAndPassword(email,password)
                
                ///REDIRECCIONAMIENTO A PERFIL
                window.history.pushState('', '', '/profile');
                location.reload();
                
                //Mensaje de validacion
            }else{
                console.log("Ya hay una sesion activa")
            }
        } catch(error){
            //En caso de error al registrarse...
            console.log(error.code);
            console.log(error.message);
        }
    }


</script>

<div class="container">
    <img src="/img/bg_3.jpg" alt="">
    <form on:submit|preventDefault={login}>
        <div>
            <h4>Iniciar Sesi&oacute;n</h4>
            <p>Entra o <a href="/register">reg&iacute;strate</a> para poder crear, clasificar, comentar o guardar recetas</p>
            <label for="mail"> <span> Correo Electr&oacute;nico:</span></label>
            <input type="text" name="mail" bind:value={email}>
            <label for="password"> <span> Contrase&ntilde;a:</span></label>
            <input type="password" name="password" bind:value={password}>
            <button>Iniciar sesion</button>
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
                margin-top: 10px;
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

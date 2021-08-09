<script>

    import { db } from "../firebase";
    import { auth } from "../firebase";
    import { storage } from "../firebase";
    import { correoUsuario } from "../store";

    //Inicializacion de variables genereales
    let titulo = '';
    let duracion = 0;
    let descripcion = '';
    let dificultad = 'Facil';
    let imagen;
    let  avatar, fileinput;


    //Apartado de seleccion de imagen
    const onFileSelected =(e)=>{
        imagen = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(imagen);
        reader.onload = e => {
            avatar = e.target.result
        };
    }

    //Apartado de ingredientes
    let nIngredientes = 1;
    let ingrediente = '';
    let ingredientes = [];

    const aggIngrediente = () =>{
        ingredientes = [...ingredientes,ingrediente]
        nIngredientes ++;
        ingrediente = '';
        console.log(ingredientes)
    }

    //Apartado de Pasos
    let nPasos = 1;
    let paso = '';
    let pasos = [];

    const aggPaso = () =>{
        pasos = [... pasos,paso]
        nPasos ++;
        paso = '';
        console.log(pasos)
    }


    //Subir recetas
    const subirReceta = async ()  =>{
        let user = auth.currentUser

        ///////////////////////////////////////SUBIENDO IMAGEN
        //variables de uso

        let storageRef = storage.ref('/recetas/' + $correoUsuario + imagen.name);
        
        let uploadTask = storageRef.put(imagen);

        const funcion = async () =>{
             uploadTask.on('state_changed', function(){
                },function(error) {
                        console.log(error.message)
                },function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        let receta = {
                            autor: user.email,
                            titulo: titulo,
                            descripcion: descripcion,
                            duracion: duracion,
                            dificultad: dificultad,
                            ingredientes:ingredientes,
                            pasos:pasos,
                            puntuado:0.0,
                            imgURL: downloadURL
                        }

                        db.collection('recetas/').doc().set(receta);
                        console.log("SUBIDA EXITOSA BRINDEMOOOS")
                        ////////////////////////////////////////////////////////RESETEO
                        //reinicio de ingredientes
                        nIngredientes = 1;
                        ingredientes = [];
                        ingrediente = '';

                        //reinicio de pasos
                        nPasos = 1;
                        paso = '';
                        pasos = [];

                        //Reinicio general
                        titulo = '';
                        duracion = 0;
                        descripcion = '';
                        imagen = '';

                    });
            });
        }

        funcion()
        
    }
</script>

<div class="container">
    <form class="paper">
        <div id="pattern">
            <form on:submit|preventDefault={subirReceta} class="form-container">
                <header>Agregar receta</header>
                
                <label for="title">Titulo de la receta</label>
                <input type="text" name="title" bind:value={titulo} placeholder="Titulo Receta">
                
                <label for="">Descripcion de la receta</label>
                <textarea name="" id="descripcion" bind:value={descripcion} cols="30" rows="2" placeholder="Descripcion de la receta"></textarea>
                
                <label for="">Duracion en minutos</label>
                <input class='no-spin' type="number" bind:value={duracion} placeholder="Duracion de la receta" min="1">
                
                <label for="">Lista de ingredientes</label>
                <form on:submit|preventDefault={aggIngrediente} class="form-lista">
                    <input type="text" bind:value={ingrediente} placeholder="Ingrediente {nIngredientes}">
                    <button>Agregar <span class="fas fa-check"></span></button>
                </form>

                <label for="">Pasos a seguir</label>
                <form on:submit|preventDefault={aggPaso} class="form-lista">
                    <input type="text" bind:value={paso} placeholder="Pasos a seguir {[nPasos]}">
                    <button>Agregar <span class="fas fa-check"></span></button>
                </form>               
                <label for="">Dificultad</label>
                <select name="dificultad" id="dificultad" bind:value={dificultad}>
                    <option value="Facil">Facil</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Dificil">Dificil</option>
                </select>
                <label for="">Foto</label>
                <div class="button-container">
                    <label class="button-file" for="foto">Seleccionar foto <span class="fas fa-file-image"></span></label>
                    <input type="file" id="foto" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
                </div>
                
                <button id="subir">Subir</button> 
            </form>
        </div>
    </form>
    <section class="preview">
        <div class="title-space">
            {#if avatar}
                <img src="{avatar}" alt="d" />
            {:else}
                <img src="/img/preview.jpg" alt="" /> 
            {/if}
            <header>{titulo}</header>
            <span>?/5</span>
        </div>
        <div class="recipe-container">
            <div class="meta-container">
                <p><span>Dificultad: </span>{dificultad}</p>
                <p><span>Duraci&oacute;n:</span> {(duracion === 0) ? duracion = "" : duracion} min </p>
            </div>
            <p id="descripcion-preview">{descripcion}</p>
            <div class="title-container">
                <h4>Ingredientes</h4>
                <div class='linea'></div>
            </div>

            {#each ingredientes as item, i}
                 <!-- content here -->
                <p>{i + 1}. {item}</p>
            {/each}
    
            <div class="title-container">
                <h4>Instrucciones</h4>
                <div class='linea'></div>
            </div>
    
            {#each pasos as item, i}
                 <!-- content here -->
                <p>{i + 1}. {item}</p>
            {/each}

    </section>
</div>

<style lang="scss">
    .container{
        display: flex;
        flex-direction: column;
        .paper{
            position: relative;
            background: white;
            border-bottom: solid 4px #f05a28;
            &::before {
                content: '';
                width: 2px;
                height: 100%;
                position: absolute;
                top: 0;
                left: 40px;
                background-color: #f05a28;
            }
            #pattern {
                height: 100%;
                background-image: repeating-linear-gradient(white 0px, white 24px, teal 25px);
            }
            .form-container{
                display: flex;
                flex-direction: column;
                padding: 23px 20px 20px 56px;
                line-height: 25px;
                letter-spacing: 1px;
                word-spacing: 5px;
                header{
                    color: #f05a28;
                    font-family: 'Bad Script', cursive;
                    font-size: 2.5em;
                    margin-bottom: 30px;
                }
                label{
                    font-weight: bold;
                    font-family: 'Bad Script', cursive;
                    color: #f05a28;
                    font-size: 1.4em;
                    margin-bottom: 5px;
                    &:nth-of-type(2){
                        margin-bottom: 2px;
                    }
                    &:nth-of-type(3){
                        margin-bottom: 4px;
                    }
                }
                .no-spin::-webkit-inner-spin-button, .no-spin::-webkit-outer-spin-button {
                    -webkit-appearance: none !important;
                    margin: 0 !important;
                 }
                .no-spin {
                    -moz-appearance:textfield !important;
                }
                input{
                    &:nth-of-type(1),
                    &:nth-of-type(2){
                        margin-bottom: 27px;
                    }
                }
                input,
                #descripcion{
                    background: transparent;
                    box-sizing: content-box;
                    border: none;
                    outline: none;
                    margin-bottom: 24px;
                    
                }
                #descripcion{
                    resize: none;
                    line-height: 24px;
                }
                .form-lista{
                    display: flex;
                    margin-top: -8px;
                    margin-bottom: 26px;
                    input{
                        margin-bottom: 0;
                        margin-top: 8px;
                        width: 100%;
                    }
                    button{
                        border: none;
                        background: transparent;
                        cursor: pointer;
                        color: #f05a28;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        transition: all .3s;
                        background: transparent;
                        border-radius: 10px;
                        padding: 0px 10px;
                        height: 24px;
                        span{
                            margin-left: 5px;
                        }
                        &:hover{
                            background: #f05a28;
                            color: white;
                        }
                    }
                }
                select{
                    margin-top: 0px;
                    margin-bottom: 26px;
                    background: transparent;
                    border: none;
                }
                .button-container{
                    margin-top: -8px;
                    display: flex;
                    height: 24px;
                    margin-bottom: 26px;
                    position: relative;
                    .button-file{
                        background-color: white;
                        font-size: 1em;
                        font-family: 'Work Sans', sans-serif;
                        border-radius: 10px;
                        color: #f05a28;
                        transition: all 0.3s;
                        cursor: pointer;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 220px;
                        padding: 0 10px;
                        position: absolute;
                        z-index: 1;
                        &:hover {
                            background-color: #f05a28;
                            color: white;
                        }
                        span{
                            margin-left: 10px;
                        }
                    }
                    input{
                        position: absolute;
                        left: 152px;
                        top: 1px;
                        font-size: 12px;
                    }
                }
            }
        }
        .preview{
            display: flex;
            flex-direction: column;
            align-items: center;
            background: white;
        .title-space{
            width: 100%;
            height: 400px;
            position: relative;
            font-weight: bold;
            color: white;
            font-size: 2em;
            border-bottom: solid 4px #f05a28;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: absolute;
            }
            header{
                position: absolute;
                top: 20px;
                left: 20px;
                z-index: 1;
                text-transform: uppercase;
                font-weight: bold;
            }
            span{
                position: absolute;
                bottom: 20px;
                right: 20px;
                z-index: 1;
            }
            &::after{
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba($color: #000000, $alpha: .3);
            }
        }
        .recipe-container{
            min-width: 100%;
            padding: 30px;
            .meta-container{
                margin-bottom: 10px;
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                font-size: 14px;
                span{
                    font-weight: bold;
                }
            }
            .title-container{
                display: flex;
                align-items: center;
                margin: 20px 0;
                h4{
                    font-size: 1.5em;
                    margin-right: 4px;
                }
                .linea{
                    width: 100%;
                    border-top: dashed 3px #f05a28;
                }
            }
        }
    
        }
        #subir{
            background: #f05a28;
            border-radius: 50px;
            border: solid 2px #f05a28;
            height: 49px;
            color: white;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 1.4em;
            cursor: pointer;
            transition: all .2s;
            &:hover{
                color: #f05a28;
                background-color: white;
            }
        }
        $breakpoint-tablet: 768px;
        @media (min-width: $breakpoint-tablet) {
            flex-direction: row;
            min-height: calc(100vh - 65px);
            .paper{
                min-width: 450px;
                border-bottom: none;
                border-right: solid 4px #f05a28;
                overflow-y: scroll;
            }
            .preview{
                width: 100%;
            }
        }
    }
    
</style>

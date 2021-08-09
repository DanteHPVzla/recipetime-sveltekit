<script>
	import RecipeCardAdmin from './../lib/recipeCardAdmin.svelte';
    import { auth, storage } from '../firebase'
    import { nombreUsuario, creacionUsuario, photoURL, correoUsuario} from '../store'
    import { recetasTotal } from '../store';
    import { usuarios } from '../store';

    const show = () => {
        document.getElementById("edit").style.visibility = 'visible';
    }
    const hide = () => {
        document.getElementById("edit").style.visibility = 'hidden';
    }

    //Apartado de seleccion de imagen
    const onFileSelected = (e)=>{
        let user = auth.currentUser

        let imagen = e.target.files[0];
       
        let storageRef = storage.ref('/usuarios/' + $correoUsuario + "/" + imagen.name);
        
        let uploadTask = storageRef.put(imagen);

        uploadTask.on('state_changed', function(){
            },function(error) {
                    console.log(error.message)
            },function() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    user.updateProfile({
                        photoURL:downloadURL
                    }).then(() =>{
                        console.log("SUBIDA EXITOSA")
                    }).catch((error) =>{
                        console.log(error)
                    })                    
                    photoURL.set(downloadURL);
                });
        });
    }

    const mostrar = async () => {
        alert("CTRL+SHIFT+I PARA ABRIR LA CONSOLA")
        $usuarios.forEach(item =>{
            console.log(item.correo)
        })
    }
</script>

<div class="container">
    <div class="img-bg">
        <div on:mouseenter={show} on:mouseleave={hide} class="profile-img">
            <img src={$photoURL} alt="">
            <div id="edit">
                <input type="file" on:change={(e)=>onFileSelected(e)} style="opacity: 0; position:absolute; width: 100%; height:100%">
                <span class="fas fa-edit"></span>
            </div>
        </div>
        <h3>{$nombreUsuario}</h3>
        <p>Fecha creacion: {$creacionUsuario}h</p>
    </div>
    <section>
        <div class="title-container">
            <h4>Ver usuarios</h4>
            <div class='linea'></div>
        </div>
        <form on:submit|preventDefault={mostrar}>
            <button>MOSTRAR USUARIOS EN CONSOLA</button>
        </form>
        
        <div class="title-container">
            <h4>Recetas</h4>
            <div class='linea'></div>
        </div>
        <div class="recipes">

            {#each $recetasTotal as item}
                <!-- content here -->
                <RecipeCardAdmin 
                    imgURL={item.imgURL} 
                    title={item.titulo} 
                    description={item.descripcion}
                    stars = {item.puntuado}
                    id = {item.id}
                />
            {/each}
        </div>
    </section>
</div>

<style lang="scss">
.container{
        display: flex;
        flex-direction: column;
        height: calc(100vh - 65px);
        .img-bg{
            width: 100%;
            height: 100%;
            min-height: 320px;
            max-height: 450px;
            overflow: hidden;
            background-image: url(/img/bg_2.jpg);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border-bottom: solid 2px #f05a28;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .profile-img{
                overflow: hidden;
                width: 200px;
                height: 200px;
                border-radius: 50%;
                display: flex;
                position: relative;
                cursor: pointer;
                img{
                    width: 100%;
                    object-fit: cover;
                }
                #edit{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: rgba($color: #000000, $alpha: .4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    visibility: hidden;
                    span{
                        color: white;
                        font-size: 1.5em;
                    }
                }
            }
            h3{
                padding: 10px 0;
                font-size: 2em;
            }
            @media (min-width: 768px) {
                max-height: 100%;
            }
        }
        section{
            background: white;
            padding: 25px;
            .title-container{
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                h4{
                    font-size: 1.5em;
                    margin-right: 4px;
                    min-width: max-content;
                }
                .linea{
                    width: 100%;
                    border-top: dashed 3px #f05a28;
                }
            }
            form{
                display: flex;
                input{
                    padding: 10px;
                    width: 100%;
                    border: none;
                    border-bottom: solid 2px #f05a28;
                    outline: none;
                }
                button{
                    border: solid 2px #f05a28;
                    color: white;
                    background-color: #f05a28;
                    padding: 10px 20px;
                    text-transform: uppercase;
                    margin-left: 10px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all .2s;
                    &:hover{
                        background-color: white;
                        color: #f05a28; 
                    }
                }
            }
            .recipes{
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
                @media (min-width: 768px) {
                    justify-content: space-between;
            }
            }
            @media (min-width: 768px) {
                overflow-y: scroll;
                
            }
        }
    
    @media (min-width: 768px) {
        flex-direction: row;
        .img-bg{
           border-bottom: none;
           border-right: solid 2px #f05a28;
        }

        section{
            width: 100%;
        }
    }
}
    
</style>

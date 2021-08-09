<script context="module">
    export async function load({page}) {
            const id = page.params.id
            return{props: {id}}
        }
</script>

<script>
    export let id;
    import { recetasTotal } from '../../store';
    import { db } from '../../firebase';
    
    let title = 'titulo';
    let img = '/img/bg_1.jpg';
    let description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, deserunt quam id quibusdam dolorum fuga numquam nihil et, nisi illum quos debitis ducimus temporibus quas aliquam accusantium reprehenderit sapiente quod.";
    let duration = 0;
    let dificulty = 'As easy as ur sister';
    let ingredients = ['atun','mas atun','aun mas atun'];
    let steps = ['sazonar elatun','cocinar el atun','comer el atun'];
    let puntos = 0;
    let stars = 0;
    let lectura = 0;
    
    $recetasTotal.forEach(item =>{
        if(item.id == id){
            title = item.titulo;
            img = item.imgURL;
            description = item.descripcion;
            duration = item.duracion;
            dificulty = item.dificultad;
            ingredients = item.ingredientes;
            steps = item.pasos;
            puntos = item.puntuado;
        }
    })

    const clickStar = async (n) => {
        stars = n;
        let starItems = document.getElementsByClassName("fa-star");
        for (let item of starItems) {
            item.style.color = "gray"; 
        }
        for (let i = 0; i < stars; i++) {
            starItems[i].style.color = "orange";   
        }

        await db.collection('recetas/').doc(id).update({
            puntuado: stars
        })

        puntos = stars   
    }

    function leer(){
       
        if (!'speechSynthesis' in window){
             alert("Lo siento, tu navegador no soporta esta tecnología")
            }
        else{
            if(lectura == steps.length){
                lectura = 0;
            }else{
                try{
                    speechSynthesis.speak(new SpeechSynthesisUtterance(steps[lectura]));
                    lectura++;
                }catch(error){
                    alert("Lo siento, tu navegador no soporta esta tecnología")
                }
            }
        }
    
     
    }

</script>

<div class="container">
    <div class="title-space">
        <img src={img} alt="">
        <header>{title}</header>
        <span>{puntos}/5</span>
    </div>
    <div class="recipe-container">
        <div class="meta-container">
            <p><span>Dificultad: </span>{dificulty}</p>
            <p><span>Duraci&oacute;n:</span> {duration} min </p>
        </div>
        <p>{description}</p>
        <div class="title-container">
            <h4>Ingredientes</h4>
            <div class='linea'></div>
        </div>
        
        {#each ingredients as item, i}
             <!-- content here -->
            <p>{i + 1}. {item}</p>
        {/each}

        <div class="title-container">
            <h4>Instrucciones</h4>
            <div class='linea'></div>
        </div>

        {#each steps as item, i}
             <!-- content here -->
            <p>{i + 1}. {item}</p>
        {/each}

            <button on:click={leer}>Leer paso {lectura + 1}</button>
        <div class="rating-container">
            <h4>Valora esta receta</h4>
            <span class="fa fa-star" on:click={() => clickStar(1)}></span>
            <span class="fa fa-star" on:click={() => clickStar(2)}></span>
            <span class="fa fa-star" on:click={() => clickStar(3)}></span>
            <span class="fa fa-star" on:click={() => clickStar(4)}></span>
            <span class="fa fa-star" on:click={() => clickStar(5)}></span>
            <span>{stars}</span>
        </div>
    </div>
</div>

<style lang="scss">
    .container{
        width: 100vw;
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
            width: 100%;
            max-width: 1000px;
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
        .rating-container{
            border-top: dashed 3px #f05a28;
            padding: 20px;
            margin-top: 20px;
            text-align: center;
            h4{
                font-size: 1.5em;
                margin-bottom: 10px;
            }
            span{
                color: gray;
                cursor: pointer;
                &:last-of-type{
                    cursor: initial;
                    color: black;
                }
            }
        }
    }
</style>
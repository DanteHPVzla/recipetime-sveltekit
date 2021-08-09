<script>
    import RecipeCard from './../lib/recipeCard.svelte';
    import { recetasTotal } from '../store';

</script>

<header class="banner">
    <img src="/img/banner.jpg" class="bg" alt="">
    <img src="/img/logo_1.png" id="logo" alt="logo RacipeTime">
    <h1>RecipeTime</h1>
    <p>¿Qu&eacute; esperas para saciar tu antojo?</p>
</header>
<div class="container">
    <div class="title-container">
        <h4>Recetas</h4>
        <div class='linea'></div>
    </div>
    <div class="recipes">
        {#each $recetasTotal as item}
            <!-- content here -->
            <RecipeCard 
                imgURL={item.imgURL} 
                title={item.titulo} 
                description={item.descripcion}
                stars = {item.puntuado}
                id = {item.id}
            />
        {/each}
    </div>
</div>

<style lang="scss">
    .banner{
        height: calc(100vh - 65px);
        position: relative;
        & > *{
            position: absolute;
        }
        .bg{
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
        &::after{
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba($color: #000000, $alpha: .2);
        }
        h1{
            z-index: 1;
            font-size: 3em;
            color: white;
            font-weight: 400;
            font-family: 'Bad Script', cursive;
            bottom: 25px;
            left: 150px;
        }
        #logo{
            z-index: 1;
            width: 120px;
            animation: spin 40s linear infinite;
            bottom: 20px;
            left: 20px;
            filter: drop-shadow(4px 4px 4px rgba(0,0,0,1));
        }
        p{
            color: white;
            font-size: 2em;
            z-index: 1;
            padding: 20px;
            width: 50%;
        }
    }
    .container{
        display: flex;
        flex-wrap: wrap;
        padding: 25px;
        background: white;
        .title-container{
                display: flex;
                align-items: center;
                margin: 0px 0 20px 0;
                width: 100%;
                h4{
                    color: #f05a28;
                    font-size: 1.5em;
                    margin-right: 4px;
                }
                .linea{
                    width: 100%;
                    border-top: dashed 3px #f05a28;
                }
            }
        .recipes{
            max-width: 1300px;
            padding: 20px;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 5px 10px;
        }
    }
    @keyframes spin{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>
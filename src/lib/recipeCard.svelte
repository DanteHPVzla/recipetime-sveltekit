<script>
    export let imgURL = "https://placekitten.com/200/300";
    export let title = "undefined"
    //TODO: ponle a la descripcion un maximo de caracteres a mostrar => Luego, (CAMBIO A FUTURO)
    export let description = "undefined";
    export let stars = 0;
    export let id = 0;

</script>

<div class="card">
    <a href={'recipes/' + id}>
        <div class="img">
            <p>{title}</p>
            <img src={imgURL} alt="">
        </div>
        <p class="descripcion">{description}</p>
        <p class="stars">{stars}/5</p>
    </a>
</div>

<style lang="scss">
    .card{
        width: 300px;
        height: 400px;
        background: white;
        box-shadow: 4px 4px 12px rgba($color: #000000, $alpha: .5);
        margin-bottom: 30px;
        overflow: hidden;
        position: relative;
        a{
            width: 100%;
            height: 100%;
            color: black;
            text-decoration: none;
        }
        .img{
            height: 200px;
            overflow: hidden;
            border-bottom: solid 4px #f05a28;
            position: relative;
            p{
                position: absolute;
                color: white;
                font-weight: bold;
                padding: 4px 8px;
                font-size: 1.5em;
                bottom: 0;
                z-index: 1;
            }
            img{
                object-fit: cover;
                width: 100%;
                height: 100%;
                position: absolute;
            }
            &::after{
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba($color: #000000, $alpha: .3);
            }
        }
        .descripcion{
            padding: 8px 20px;
        }
        .stars{
            position: absolute;
            color: #f05a28;
            font-weight: bold;
            font-size: 1.2em;
            bottom: 20px;
            right: 20px;
        }
        &:hover{
            transition: 0.2s;
            transform: scale(1.02);
        }
    }
</style>
<script>
    import inactiveNav from '$lib/inactiveNav.svelte';
    import activeNav from '$lib/activeNav.svelte';
    import {auth, db} from '../firebase'; 
    import {activeSesion} from '../store';
    import { nombreUsuario , correoUsuario, creacionUsuario, photoURL} from '../store';
    import { recetasUser, recetasTotal, usuarios } from '../store';

   


    const navs = [
		{ sesion: 'inactive', component: inactiveNav },
		{ sesion: 'active',   component: activeNav   }
	];
    let sesion = navs[0];
    auth.onAuthStateChanged((user) => {
        if (user) {
            nombreUsuario.set(user.displayName);
            correoUsuario.set(user.email);
            creacionUsuario.set(user.metadata.creationTime);
            photoURL.set(user.photoURL);
            activeSesion.set(1);
            sesion = navs[1];

            db.collection('recetas').onSnapshot(querySnapshot => {
                let docs =[];
                querySnapshot.forEach(doc => {
                    docs.push({...doc.data(), id: doc.id})
                })
                recetasTotal.set([...docs])

                recetasUser.set([])
                $recetasTotal.forEach( item =>{
                    if (item.autor == user.email){
                        recetasUser.set([...$recetasUser,item])
                    }
                })
            });

            db.collection('usuarios').onSnapshot(querySnapshot => {
                let docs = [];
                querySnapshot.forEach(doc =>{
                    docs.push({...doc.data(), idDoc: doc.id})
                })
                usuarios.set([...docs])
            })

        }else{
            nombreUsuario.set("No disponible");
            correoUsuario.set("No disponible");
            creacionUsuario.set("No disponible")
            activeSesion.set(0)
            sesion = navs[0];
        }
        });

    
</script>

<div class="content">
    <svelte:component this={sesion.component} />
    <slot></slot>
</div>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Bad+Script&family=Work+Sans&display=swap');
    :global(*){
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    :global(body){
        font-family: 'Work Sans', sans-serif;
        font-size: 16px;
        background-color: #F7931E;
    }
</style>
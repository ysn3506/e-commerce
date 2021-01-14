import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const config={
    apiKey: "AIzaSyAWVXfcqslYhwkCXzmPF5aKEwesXeZQkYc",
    authDomain: "e-commerce-reactdb.firebaseapp.com",
    projectId: "e-commerce-reactdb",
    storageBucket: "e-commerce-reactdb.appspot.com",
    messagingSenderId: "345774346439",
    appId: "1:345774346439:web:48b9b734549f0a284a2ee2",
    measurementId: "G-WCRHWGKWD3"
  };

  firebase.initializeApp(config)

  export const createUserProfileDocument=async(userAuth,additionalData)=>{
    if(!userAuth) return

    const userRef=firestore.doc(`users/${userAuth.uid}`)

    
    const snapShot= await userRef.get()


    if(!snapShot.exists){
      const {displayName,email}=userAuth
      const createdAt=new Date()

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
  
      } catch (error) {
        console.log('eror',error.message)
      }
    }

    return userRef
  }


  //In order to add shop data to firebase
  export const addCollectionAndDocuments=async (collectionKey,objectsToAdd)=>{
      const collectionRef=firestore.collection(collectionKey)
      console.log(collectionRef)


      const batch=firestore.batch()
      objectsToAdd.forEach(obj => {
        const newDocRef=collectionRef.doc()
        batch.set(newDocRef,obj)
      })

      return await batch.commit()


  }


  export const convertCollectionSnapshotToMap=(collections)=>{
    const trasnformedCollection=collections.docs.map(doc=>{
        const {title,items}=doc.data()
        
        return{
          routeName:encodeURI(title.toLowerCase()),
          id:doc.id,
          title,
          items
        }
    })

    return trasnformedCollection.reduce((accumulator,collection)=>{
      accumulator[collection.title.toLowerCase()]=collection
      return accumulator
    },{})
    
  }



  export const auth=firebase.auth()
  export const firestore=firebase.firestore()


  const provider=new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt:'select_account'})
  export const signInWithGoogle=()=>auth.signInWithPopup(provider)

  export default firebase;
import React, { useEffect, useState } from "react";
import Footer from '../components/footer';
//import { navigate } from "@reach/router";
import { useMoralis } from "react-moralis";
import { DEMO_AVATAR } from "../components/constants/keys";

const Author = () => {

  const { user, setUserData, Moralis } = useMoralis();

  const [file1, setFile1] = useState();
  const [baseFile1, setBaseFile1] = useState();

  const [file2, setFile2] = useState();
  const [baseFile2, setBaseFile2] = useState();
  
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    if(user){
      setUsername(user.get('username'))
      setBio(user.get('bio'))
      setEmail(user.get('email'))
      setFile1(user.get('avatar'))
      setFile2(user.get('banner'))
    }
  }, [user])

  const uploadImage = async (x) => {
    const nowTime = new Date().getTime();
    var nftImageFile = new Moralis.File(nowTime, x);
    await nftImageFile.saveIPFS();
    return nftImageFile.ipfs();
  };

  const onChangeFile1 = async (e) => {
    var file = e.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      const image = await uploadImage(file);
      setBaseFile1(base64);
      setFile1(image);
    }
  };

  const onChangeFile2 = async (e) => {
    var file = e.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      const image = await uploadImage(file);
      setBaseFile2(base64);
      setFile2(image);
    }
  };

  const onSaveProfile = async () => {
    await setUserData({
      username,
      bio,
      email,
      avatar: file1,
      banner: file2
    })
    alert('saved!')
  }

  return (
    <div>
      <section style={{ marginTop: -100 }}>
        <div className='d-center hero' style={{ height: 450 }}>
          <h1 style={{ fontWeight: '600' }}>Author</h1>
        </div>
      </section>

      <section className='container'>
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">

                <div className="spacer-single"></div>

                <h5>Username</h5>
                <input 
                  className="form-control" 
                  placeholder="Enter username" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}  
                />

                <div className="spacer-10"></div>

                <h5>Bio</h5>
                <textarea 
                  data-autoresize 
                  className="form-control" 
                  placeholder="Tell the world your story!"
                  value={bio}
                  onChange={e => setBio(e.target.value)}  
                ></textarea>

                <div className="spacer-10"></div>

                <h5>Email Address</h5>
                <input 
                  className="form-control" 
                  placeholder="Enter email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}  
                />

                <div className="spacer-10"></div>


                <div className="spacer-10"></div>

                <h5>Wallet Address</h5>
                <input className="form-control" placeholder="Wallet Address" disabled value={user?.get('ethAddress')}/>

                <div className="spacer-10"></div>

                <div type="button" className="btn-main" onClick={onSaveProfile}>
                  Save
                </div>
              </div>
            </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5 className="text-center mt-50">Profile Image</h5>

            <div className="d-create-file" style={{ border: 'none', marginTop: -46 }}>

              <div className='browse'>
                <img className='profile-avatar' type="button" id="get_file" style={{ marginTop: 0, }} src={baseFile1 || file1 || DEMO_AVATAR} alt='avatar' /><br />
                <input id='upload_file' type="file" multiple onChange={onChangeFile1} style={{ cursor: 'pointer' }} />
              </div>

            </div>

            <h5 className="text-center">Profile Banner</h5>

            <div className="d-create-file" style={{ border: 'none', marginTop: -46 }}>

              <div className='browse'>
                <div id="get_file">
                  {(baseFile2 || file2) && <img className='profile-banner' type="button" id="get_file" style={{ marginTop: 0, }} src={baseFile2 || file2 } alt='avatar' />}
                  {!(baseFile2 || file2) && <div className='profile-banner' style={{ marginTop: 0, }} />}
                  <br />
                  <input id='upload_file' type="file" multiple onChange={onChangeFile2} style={{ cursor: 'pointer' }} />
                </div>
              </div>

            </div>
            <br />

          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default Author;

function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
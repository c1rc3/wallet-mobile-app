import React from 'react'
import { Container } from '../../component/commons'
import HomeNavBar from '../../component/navbar/home-navbar'
import { BaseScreen } from '../commons'
import { SCREEN_IDS, SCREEN_OPTIONS } from '../const'
import ImagePicker from 'react-native-image-picker'
import { CameraRoll, ScrollView } from 'react-native'
import Steganos from '../../service/Steganos'
import { Pie, Theme } from '../../component/chart'
import WalletItemComponent from '../../component/wallet-item'

export class HomeScreen extends BaseScreen {
    static navigatorButtons = {
        leftButtons: [
            {
                title: 'Back',
                id: 'helloBtn',
            }
        ],
        rightButtons: [
            {
                title: 'Right',
                id: 'helloBtn2',
            }
        ],
    };
    static navigatorStyle = {
        ...SCREEN_OPTIONS.navBarHidden
    };
    static imageOptions = {
        title: 'Select Avatar',
        customButtons: [
            { name: 'fb', title: 'Choose Photo from Facebook' },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            binary: '',
            base64: '',
            photos: []
        }

        // this.props.navigator.setStyle({
        //     navBarBackgroundColor: 'blue'
        // })
    }
    componentDidMount() {
        this.props.navigator.setTitle({
            title: 'WALLET'
        })
        // this.props.navigator.setStyle({
        //     navBarCustomView: COMPONENT_IDS.homeNavBar,
        //     navBarComponentAlignment: 'center',
        //     navBarCustomViewInitialProps: {
        //         title: 'Hi Custom',
        //         navigator: this.props.navigator,
        //     },
        // })

        // console.log(NativeModules)
        // CameraRoll.getPhotos({
        //     first: 20,
        //     assetType: 'All'
        // })
        //     .then(r => {
        //         this.setState({ photos: r.edges.map(edges => edges.node.image.uri) })
        //         console.log()
        //     })
        // const sec = '1234567812345678'
        // Crypto.encrypt(sec, '123123123', (encrypt) => {
        //     console.log('encrypt', encrypt)

        //     Crypto.decrypt(sec, encrypt, (decrypt) => {
        //         console.log('decrypt', decrypt)
        //     })
        // })
        // .then(resp => {
        //     console.log(resp)
        // }).catch(e => {
        //     console.log(e)
        // })
    }
    render() {
        const height = 200
        const width = 500
        const data = [
            { 'number': 42, 'name': 'Rent' },
            { 'number': 23, 'name': 'Car' },
            { 'number': 16, 'name': 'Food' },
            { 'number': 8, 'name': 'Fun activities' },
            { 'number': 7, 'name': 'Dog' },
            { 'number': 4, 'name': 'Misc' },
        ]
        let areaData = [
            { year: 2016, value: 3.24 },
            { year: 2015, value: 3.24 },
            { year: 2014, value: 10.35 },
            { year: 2013, value: 10.84 },
            { year: 2012, value: 9.92 },
            { year: 2011, value: 65.80 },
            { year: 2010, value: 19.47 },
            { year: 2009, value: 30.24 },
            { year: 2008, value: 10.35 },
            { year: 2007, value: 10.84 },
            { year: 2006, value: 19.92 },
            { year: 2005, value: 80.80 },
            { year: 2004, value: 19.47 },
            { year: 2003, value: 34.24 },
            { year: 2001, value: 65.35 },
            { year: 2000, value: 45.84 },
            { year: 1999, value: 60.92 },
            { year: 1998, value: 21.80 },
            { year: 1997, value: 19.47 },
            { year: 1996, value: 3.24 },
            { year: 1995, value: 10.35 },
            { year: 1994, value: 20.84 },
            { year: 1993, value: 60.92 },
            { year: 1992, value: 80.80 },
        ]
        console.log(this.state.photos)
        // onItemSelected={this._onPieItemSelected}

        return (
            <Container>
                <HomeNavBar />
                <ScrollView>
                    <Pie
                        pieWidth={150}
                        pieHeight={150}
                        colors={Theme.colors}
                        width={width}
                        height={height}
                        data={data} />
                    <WalletItemComponent />
                    <WalletItemComponent />
                    <WalletItemComponent />
                    <WalletItemComponent />
                    <WalletItemComponent />
                </ScrollView>
            </Container>
        )
    }
    _navToWelcome() {
        this.props.navigator.push({
            screen: SCREEN_IDS.welcome, // unique ID registered with Navigation.registerScreen
            title: SCREEN_IDS.welcome,
        })
    }
    _saveImage(base64) {
        alert
        CameraRoll.saveToCameraRoll('data:image/jpeg;base64,' + base64, 'photo').then(function (data) {
            console.log(data)
        }).catch(function (err) {
            console.log(err)
        })
    }
    _pickImage() {
        ImagePicker.showImagePicker(BaseScreen.imageOptions, (response) => {
            console.log('Response = ', response)

            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            }
            else {
                this.setState({
                    image: { uri: 'data:image/jpeg;base64,' + response.data },
                })
                console.log('START ENCRYPT IMAGE', response.data)
                Steganos.hide(response.data, 'This is My Data', (resp) => {
                    console.log('ENCRYPT IMAGE FINISHED', resp)
                    let source = { uri: 'data:image/jpeg;base64,' + resp }
                    this._saveImage(resp)
                    this.setState({
                        image: source
                    })
                })
            }
        })
    }
    _pickImage2() {
        ImagePicker.showImagePicker(BaseScreen.imageOptions, (response) => {
            console.log('Response = ', response)

            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            }
            else {
                this.setState({
                    image: { uri: 'data:image/jpeg;base64,' + response.data },
                    //     base64: `${response.data}`.substr(0, 200),
                    //     // binary: fs.readFile(response.uri)
                })
                // let source = { uri: response.uri }
                console.log(response)
                console.log('START DECRYPT IMAGE', response.data)
                Steganos.readHidden(response.data, (resp) => {
                    console.log('DECRYPT IMAGE FINISHED WITH DATA', resp || '<EMPTY>')
                })
            }
        })
    }
}

export default HomeScreen
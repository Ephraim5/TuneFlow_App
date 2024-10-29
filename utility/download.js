import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-asset';

export const download = async (song, name) => {
  const [downloadProgress, setDownloadProgress] = useState(0);

    
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

    const requestStoragePermission = async () => {
        try {
          const { status } = await MediaLibrary.requestPermissionsAsync();
          if (status !== 'granted') {
            throw new Error('Permission to access storage is required!');
          }
          return true;
        } catch (error) {
          alert(error.message);
          return false;
        }
      };
      const copyLogoToDocumentDirectory = async () => {
        console.log("called")
        const logoAsset = Asset.fromModule(require('../assets/logo.png'));
        await logoAsset.downloadAsync();
        const localUri = asset.localUri;
        if (!localUri) {
          console.log("failed")
          throw new Error('Failed to download asset.');
        }
        console.log(localUri)
        const logoUri = `${FileSystem.documentDirectory}/logo.png`;
        await FileSystem.copyAsync({
          from: localUri,
          to: logoUri,
        });
      };
      const registerForPushNotificationsAsync = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          await Notifications.requestPermissionsAsync();
        }
      };
    
    useEffect(() => {
        setSongArry(...list)
        copyLogoToDocumentDirectory();
        registerForPushNotificationsAsync();
      }, []);
    const logoUri = `${FileSystem.documentDirectory}/logo.png`;

    const sendProgressNotification = async (progress, name) => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'TuneFLow ',
          body: `${name}, is downloading`,
          icon: `${FileSystem.documentDirectory}/logo.png`
        },
        trigger: null,
      });
    };
  
    const sendCompletionNotification = async (songName) => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'TuneFLow Download Complete',
          body: `${songName} has been downloaded `,
          icon: `${FileSystem.documentDirectory}/logo.png`
        },
        trigger: null,
      });
    };
    const songUrl = await song;
    if (songUrl) {
        const fileUri = await downloadSong(song, name);
    } else {
        return ('unable to download song cheack internet or download limit exided');
    }
    const downloadSong = async (song, name) => {


        const permissionGranted = await requestStoragePermission();
        await copyLogoToDocumentDirectory()
        console.log("done")
        if (!permissionGranted) {
            alert('Permission to access storage is required!');
            await requestStoragePermission();
            return;
        } else {

            const directory = FileSystem.documentDirectory + 'TuneFlow_Downloads';
            await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

            const fileUri = directory + songName + '.mp3';
            const downloadResumable = FileSystem.createDownloadResumable(
                songUrl,
                fileUri,
                {},
                (downloadProgress) => {
                    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
                    setDownloadProgress(progress);
                }
            );

            try {
                sendProgressNotification(downloadProgress, songName);
                const { uri } = await downloadResumable.downloadAsync();
                sendCompletionNotification(songName);
                return "done";
            } catch (e) {
                console.error(e);
                return "failed";
            }
        }
    };
  
}
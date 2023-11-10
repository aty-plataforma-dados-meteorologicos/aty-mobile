import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { BodyModalContent, CloseButton, Container, Header, Image, ModalView, Title } from "./styles";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../Button";
import * as FileSystem from 'expo-file-system';

type Props = {
    onClose: (event : any) => void
    showModal: boolean;
    onSubmit: (data : any) => void;
}

export function ModalImagePicker({ onClose, onSubmit, showModal } : Props){

    const [imageBase64, setImageBase64] = useState<string | null>(null);

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.3,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            try {
                const base64Image = await imageToBase64(imageUri);
                setImageBase64(base64Image);
            } catch (error) {
                console.error('Erro ao converter imagem em base64:', error);
            }
        }
    }

    async function openCamera() {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.3,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            try {
                const base64Image = await imageToBase64(imageUri);
                setImageBase64(base64Image);
            } catch (error) {
                console.error('Erro ao converter imagem em base64:', error);
            }
        }
    }

    async function imageToBase64(imageUri: string): Promise<string> {
        const fileInfo = await FileSystem.getInfoAsync(imageUri);
        if (fileInfo.exists) {
            const base64 = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            return `${base64}`;
        } else {
            throw new Error('Arquivo de imagem não encontrado');
        }
    }

    useEffect(() => {
        const requestPermissions = async () => {
          const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
          const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      
          if (galleryPermission.status !== "granted" || cameraPermission.status !== "granted") {
            alert("É necessário conceder permissão para acessar a galeria e a câmera para utilizar essa funcionalidade.");
            onClose
          }
        };
      
        requestPermissions();
      }, []);
      

    return(
        <Container
            animationType="slide"
            visible={showModal}
            transparent={true}
        >
            <ModalView>
                <Header>
                    <Title>Adicionar Foto</Title>
                    <CloseButton onPress={onClose}>
                        <FontAwesomeIcon icon={faTimes} size={25} color="#FFFFFF" />
                    </CloseButton>
                </Header>
                    <BodyModalContent>
                        {imageBase64 && <Image source={{ uri: `data:image/jpeg;base64,${imageBase64}` }} /> }
                        <Button title="Abrir Galeria" onPress={pickImage} color="PRIMARY" />
                        <Button title="Abrir Camera" onPress={openCamera} color="PRIMARY" />
                        {imageBase64 && <Button title="Enviar" onPress={() => onSubmit(imageBase64)} color="SECONDARY" /> }
                    </BodyModalContent>
            </ModalView>
        </Container>
    )
}

import React, { useEffect, useState } from "react";
import { Container, EyeIconContainer, InputContainer, InputText, Title } from "./styles";
import { KeyboardTypeOptions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type Props = {
    titleInput?: string,
    placeholder?: string,
    value?: string,
    keyboardType?: 'default' | 'phone-pad' | 'cpf-cnpj' | 'url' | 'num',
    secureTextEntry?: boolean,
    onBlur?: () => void,
    onChangeText: (text: string) => void
}

// Componente de input da aplicação. Pode ser utilizado em todos os input na aplicação mudando apenas o keyboard type. Por padrão o keyboard
// como default será o de texto. Phone-pad e cpf-cnpj mudam o estilo do teclado para numérico e aplica uma mascara. URL somente muda o estilo
// do teclado com atalhos para url.

export function Input({titleInput, placeholder, value, onChangeText, keyboardType, onBlur, secureTextEntry=false} : Props){
    const [maskedText, setMaskedText] = useState(value || '');  
    const [unmaskedText, setUnmaskedText] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

    const applyPhoneMask = (value: string) => {
        let newText = value.replace(/[^\d]/g, '');
        let maskedText = '(';
        for (let i = 0; i < newText.length; i++) {
            if (i === 2) maskedText += ') ';
            else if (i === 7) maskedText += '-';
            if (i < 11) maskedText += newText[i];
        }
        return {maskedText, unmaskedText: newText};
    }

    const applyCpfCnpjMask = (value: string) => {
        let newText = value.replace(/[^\d]/g, '');
        let maskedText = '';
        if (newText.length <= 11) {  // CPF
            for (let i = 0; i < newText.length; i++) {
                if (i === 3 || i === 6) maskedText += '.';
                else if (i === 9) maskedText += '-';
                maskedText += newText[i];
            }
        } else {  // CNPJ
            for (let i = 0; i < newText.length; i++) {
                if (i === 2 || i === 5) maskedText += '.';
                else if (i === 8) maskedText += '/';
                else if (i === 12) maskedText += '-';
                if (i < 14) maskedText += newText[i];  // Limitando 14 caracteres no CNPJ
            }
        }
        return {maskedText, unmaskedText: newText};
    }
    

    const handleChangeText = (value: string) => {
        let maskResult;
        if (keyboardType === 'phone-pad') {
            maskResult = applyPhoneMask(value);
        } else if (keyboardType === 'cpf-cnpj') {
            maskResult = applyCpfCnpjMask(value);
        } else {
            maskResult = { maskedText: value, unmaskedText: value };
        }

        setMaskedText(maskResult.maskedText);
        setUnmaskedText(maskResult.unmaskedText);
        onChangeText(maskResult.unmaskedText);
    };

    useEffect(() => {
        if (value) {
            let maskResult;
            if (keyboardType === 'phone-pad') {
                maskResult = applyPhoneMask(value);
            } else if (keyboardType === 'cpf-cnpj') {
                maskResult = applyCpfCnpjMask(value);
            } else {
                maskResult = { maskedText: value, unmaskedText: value };
            }

            setMaskedText(maskResult.maskedText);
            setUnmaskedText(maskResult.unmaskedText);
        }
    }, []);

    return(
        <Container>
            {titleInput && <Title>{titleInput}</Title>}
            <InputContainer>
            <InputText 
                placeholder={placeholder} 
                value={maskedText} 
                onChangeText={handleChangeText} 
                keyboardType={
                    keyboardType === 'phone-pad' || keyboardType === 'cpf-cnpj' 
                    ? 'numeric' 
                    : keyboardType === 'url'
                        ? 'url'
                        : keyboardType === 'num'
                            ? 'numeric'
                            : 'default'
                } 
                secureTextEntry={isPasswordVisible}
                onBlur={onBlur}
            />
            {secureTextEntry && (
                    <EyeIconContainer onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} color="#FFF" />
                    </EyeIconContainer>
                )}
            </InputContainer>
        </Container>
    )
}
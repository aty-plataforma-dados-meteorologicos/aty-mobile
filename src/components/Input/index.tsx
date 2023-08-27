import React, { useState } from "react";
import { Container, InputText, Title } from "./styles";
import { KeyboardTypeOptions } from "react-native";

type Props = {
    titleInput?: string,
    placeholder?: string,
    keyboardType?: 'default' | 'phone-pad' | 'cpf-cnpj',
    onChangeTeste: (text: string) => void
}

export function Input({titleInput, placeholder, onChangeTeste, keyboardType} : Props){
    const [maskedText, setMaskedText] = useState('');  
    const [unmaskedText, setUnmaskedText] = useState('');

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
        onChangeTeste(maskResult.unmaskedText);
    };

    return(
        <Container>
            {titleInput && <Title>{titleInput}</Title>}
            <InputText placeholder={placeholder} value={maskedText} onChangeText={handleChangeText} keyboardType={keyboardType === 'phone-pad' || keyboardType === 'cpf-cnpj' ? 'numeric' : 'default'}>
            </InputText>
        </Container>
    )
}
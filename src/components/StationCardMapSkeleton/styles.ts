import { Animated } from "react-native";
import styled from "styled-components/native";

const AnimatedBackground = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`);

export const SkeletonContainer = styled.View`
    width: 360px;
    height: 350px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.COLORS.SHAPE_TERCIARIA};
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const SkeletonContainerOne = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 30px;
`
export const SkeletonContainerPhoto = styled.TouchableOpacity`
    background-color: gray;
    width: 70px;
    height: 70px;
    overflow: hidden;
`


export const SkeletonContainerTitle = styled.View`
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex: 1;
    margin-left: 10px;
`

export const SkeletonTitle = styled.Text`
    width: 110px;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: gray;
    overflow: hidden;
`

export const SkeletonSubtitle = styled.Text`
    background-color: gray;
`

export const Icon = styled.TouchableOpacity`
    margin-right: 20px;
`

export const SkeletonContainerTwo = styled.View`
    width: 100%;
    margin-left: 40px;
    margin-right: 10px;
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const SkeletonVerticalScrollView = styled.ScrollView`
  flex-direction: column;
  height: 180px;
  width: 100%;
`;

export const SkeletonContainerSensor = styled.View`
    width: 310px;
    height: 30px;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: gray;
    overflow: hidden;
`

export const TitleSensor = styled.Text`
    flex: 1;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONT_SIZE.LG}px;
    color: ${({theme}) => theme.COLORS.WHITE};
`

export const SkeletonContainerThree = styled.View`
    width: 100%;
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const SkeletonButton = styled.TouchableOpacity`
    width: 300px;
    height: 40px;
    border-radius: 10px;
    background-color: gray;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

export const ButtonTitle = styled.Text`
`

export { AnimatedBackground };
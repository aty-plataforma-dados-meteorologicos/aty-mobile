import React, { useEffect, useRef } from 'react';
import { SkeletonContainer, SkeletonContainerOne, SkeletonContainerPhoto, SkeletonContainerTitle, SkeletonTitle, SkeletonContainerTwo, SkeletonContainerThree, SkeletonButton, SkeletonVerticalScrollView, SkeletonContainerSensor, AnimatedBackground } from './styles';
import { Animated, Easing } from 'react-native';

export function StationCardSkeleton() {
const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const marginLeft = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-30%', '100%'],
  });

  return (
    <SkeletonContainer>
      <SkeletonContainerOne>
        <SkeletonContainerPhoto> 
            <AnimatedBackground style={{ marginLeft, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        </SkeletonContainerPhoto>
        <SkeletonContainerTitle>
            <SkeletonTitle> 
                <AnimatedBackground style={{ marginLeft, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            </SkeletonTitle>
            <SkeletonTitle> 
                <AnimatedBackground style={{ marginLeft, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            </SkeletonTitle>
        </SkeletonContainerTitle>
      </SkeletonContainerOne>
      <SkeletonContainerTwo>
        <SkeletonVerticalScrollView>
            <SkeletonContainerSensor> 
                <AnimatedBackground style={{ marginLeft, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            </SkeletonContainerSensor>
            <SkeletonContainerSensor> 
                <AnimatedBackground style={{ marginLeft, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            </SkeletonContainerSensor>
            <SkeletonContainerSensor> 
                <AnimatedBackground style={{ marginLeft, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            </SkeletonContainerSensor>
            <SkeletonContainerSensor> 
                <AnimatedBackground style={{ marginLeft, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            </SkeletonContainerSensor>
        </SkeletonVerticalScrollView>
      </SkeletonContainerTwo>
      <SkeletonContainerThree>
        <SkeletonButton> 
            <AnimatedBackground style={{ marginLeft, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        </SkeletonButton>
      </SkeletonContainerThree>
    </SkeletonContainer>
  );
}

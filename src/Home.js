import { useEffect } from 'react';
import * as dat from 'dat.gui';
import styled from 'styled-components';

const Section = styled.div`
    height: 100%;
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(#D0D9D6, #ffffff);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    width: 90%;
    max-width: 900px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: contain;
`;

const Svg = styled.svg`
    height: 0;
	width: 0;
	visibility: hidden;;
`;

const Image = styled.img`
    -webkit-filter: url("#filter");
    filter: url("#filter");
    height: 100%;
    width: 90%;
    max-width: 700px;
`;

const Home = () => {
    useEffect(() => {
        var turb = document.querySelectorAll('#filter feTurbulence')[0];
        var dm = document.querySelectorAll('#filter feDisplacementMap')[0];
        var params = {
            baseFrequencyX: 0.0001,
            baseFrequencyY: 0.0001,
            scale: 30
        }
        let gui = new dat.GUI();
        gui.add(params, 'baseFrequencyX').min(0.0001).max(0.2).step(0.001).onChange(update);
        gui.add(params, 'baseFrequencyY').min(0.0001).max(0.2).step(0.001).onChange(update);
        gui.add(params, 'scale').min(0).max(100).step(1).onChange(update);


        function update() {
            turb.setAttribute('baseFrequency', params.baseFrequencyX + ' ' + params.baseFrequencyY);
            dm.setAttribute('scale', params.scale);
        }


    }, []);

    return (
        <>
            <Section>
                <Container>
                    <Svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <filter id="filter">
                            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" result="warp"></feTurbulence>
                            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="60" in="SourceGraphic" in2="warp"></feDisplacementMap>
                        </filter>
                    </Svg>
                    <Image src='https://source.unsplash.com/1600x900/?nature,water' />
                </Container>
            </Section>
        </>
    )
}

export default Home

import styled from 'styled-components';

const SubmitBtnContainer = styled.button`
    padding:.7em;
    font-weight:800;
    background:var(--discord-blue);
    border:none;
    cursor: pointer;
    margin-top:2em;
    transition:background 200ms ease;
    color:var(--white);
    font-size:var(--fs-m);
    border-radius:2px;
    :hover{
        background:var(--discord-blue-dark);
    }
    .submitting{
        pointer-events: none;
        opacity:.5;
    }
`

export default SubmitBtnContainer;
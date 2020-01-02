import React from 'react';
import style from '../styling/poho.module.css';

function ChampionMastery (props) {
    return (
        <tr>
            <td>
                <img 
                    src={'http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/' + props.champion_name + '.png'} 
                    width='75px' height='75px'
                />
            </td>
            <td><p>{ props.champion_points }</p></td>
        </tr>
    )
}

function App (props) {
    return (
        <table className={ style.champion_mastery + ' ' + style.summoner_table}>
            <thead>
                <tr>
                    <th colSpan={2}>{ props.summoner_name }</th>
                </tr>
            </thead>
            <tbody>
                {props.masteries.map((element, index) => (
                    <ChampionMastery
                        key={ index }
                        champion_name = { element.champion.name } champion_points = { element.mastery.championPoints }
                    />
                ))}
            </tbody>
        </table>
	)
}

export default App
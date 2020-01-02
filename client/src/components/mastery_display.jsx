import React from 'react';
import style from '../styling/poho.module.css';

function ChampionMastery (props) {
    return (
        <tr>
            <td>
                <img 
                    src={'http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/' + props.champion_name + '.png'} 
                    alt={ props.champion_display_name + ' profile picture' }
                    title={ props.champion_display_name }
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
                {
                    props.rank.tier ?
                    <tr>
                        <th>
                            <img 
                                src={'https://pro-bans.s3.us-east-2.amazonaws.com/Emblem_' + props.rank.tier.charAt(0).toUpperCase() + props.rank.tier.slice(1).toLowerCase() + '.png'} 
                                alt={ props.rank.tier.charAt(0).toUpperCase() + props.rank.tier.slice(1).toLowerCase() + ' tier icon' }
                                title={ props.rank.tier.charAt(0).toUpperCase() + props.rank.tier.slice(1).toLowerCase() + ' ' + props.rank.rank }
                                width='75px' height='75px'
                            />
                        </th>
                        <th>
                            { props.rank.rank }
                        </th>
                    </tr> :
                    <tr>
                        <th>
                            <img 
                                src={'https://pro-bans.s3.us-east-2.amazonaws.com/Emblem_Iron.png'} 
                                alt={ 'Iron tier icon (no Solo Queue rank found)' }
                                title={ 'No Solo Queue rank found' }
                                width='75px' height='75px'
                            />
                        </th>
                        <th>
                            N/A
                        </th>
                    </tr>
                }    
            </thead>
            <tbody>
                {props.masteries.map((element, index) => (
                    <ChampionMastery
                        key={ index }
                        champion_name={ element.champion.name } champion_display_name={ element.champion.display_name } champion_points={ element.mastery.championPoints }
                    />
                ))}
            </tbody>
        </table>
	)
}

export default App
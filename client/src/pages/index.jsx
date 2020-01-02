import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import MasteryDisplay from '../components/mastery_display'
import style from '../styling/poho.module.css';

async function findSummoner(summoner_name) {
    return new Promise(resolve => {
        axios.get(`http://localhost:3000/users/summoner/` + summoner_name)
        .then(res => {
            if(res.data.length) {
                getMasteries(res.data[0].summoner_id)
				.then(function (masteries) {
					axios.get('http://localhost:3000/rank/' + res.data[0].summoner_id)
					.then(res_a => {
						resolve({masteries: masteries, solo_queue: res_a.data})
					})
				})
            }
            else {
                axios.post(`http://localhost:3000/users`, {
                    'summoner_name': summoner_name
                })
                .then(res_post => {
                    getMasteries(res_post.data.summoner_id)
					.then(function (masteries) {
						axios.get('http://localhost:3000/rank/' + res_post.data.summoner_id)
						.then(res_a => {
							resolve({masteries: masteries, solo_queue: res_a.data})
						})
					})
                })
                .catch(error_post => {
                    console.log(error_post)
                })
            }
        })
    })
}

async function getMasteries(summoner_id) {
    return new Promise(resolve => {
        axios.get(`http://localhost:3000/champion_masteries/` + summoner_id)
        .then(res => {
            if(res.data.length) {
                let json_array = res.data
                resolve(json_array.slice(0, 5))
            }
            else {
                console.log('No champion masteries found')
            }
            return res.data
        })

    })

}

function getChampions () {
    return new Promise(resolve => {
        axios.get('http://localhost:3000/champions/')
        .then(res => {
            resolve(res.data)
        })
        .catch(error => {
        })
    })
}

function joinChampionsMasteries(champions, masteries) {
	let joined_matches = []
	
	return new Promise(resolve => {
		resolve(
			masteries.map((mastery) => {
				champions.map((champion) => {
					if(mastery.championId === champion.id) {
						joined_matches.push({
							mastery: mastery,
							champion: champion
						})
					}
				})
			})
		)
	})
	.then(function (value) {
		return joined_matches
	})
}

function ChampionMasteriesDisplay (props) {
	return (
		<table className={ style.mastery_table}>
			<thead>
			</thead>
			<tbody>
				<tr>
					<td>
						<MasteryDisplay 
							masteries={ props.top_masteries.masteries } summoner_name={ props.top } rank={ props.top_rank }
						/>
					</td>
					<td>
						<MasteryDisplay 
							masteries={ props.jungle_masteries.masteries } summoner_name={ props.jungle } rank={ props.jungle_rank } 
						/>
					</td>
					<td>
						<MasteryDisplay 
							masteries={ props.mid_masteries.masteries } summoner_name={ props.mid } rank={ props.mid_rank } 
						/>
					</td>
					<td>
						<MasteryDisplay 
							masteries={ props.marksman_masteries.masteries } summoner_name={ props.marksman } rank={ props.marksman_rank } 
						/>
					</td>
					<td>
						<MasteryDisplay 
							masteries={ props.support_masteries.masteries } summoner_name={ props.support } rank={ props.support_rank } 
						/>
					</td>
				</tr>
			</tbody>
		</table>
	)
}

function App() {
	const [champions, set_champions] = useState(null)
	const [champions_set, set_champions_set] = useState(false)

    const [top, set_top] = useState('Ryujinism')
	const [top_masteries, set_top_masteries] = useState({ masteries: null })
	const [top_rank, set_top_rank] = useState({ queue: null })
	const [jungle, set_jungle] = useState('you go chinatown')
	const [jungle_masteries, set_jungle_masteries] = useState({ masteries: null })
	const [jungle_rank, set_jungle_rank] = useState({ queue: null })
    const [mid, set_mid] = useState('Emy')
	const [mid_masteries, set_mid_masteries] = useState({ masteries: null })
	const [mid_rank, set_mid_rank] = useState({ queue: null })
    const [marksman, set_marksman] = useState('SKT T1 Luda')
	const [marksman_masteries, set_marksman_masteries] = useState({ masteries: null })
	const [marksman_rank, set_marksman_rank] = useState({ queue: null })
    const [support, set_support] = useState('bernardhibou')
	const [support_masteries, set_support_masteries] = useState({ masteries: null })
	const [support_rank, set_support_rank] = useState({ queue: null })

    const [redirect, set_redirect] = useState(false)

	useEffect(() => {
		if (!champions_set) {
			getChampions()
			.then(champs => {
				return set_champions(champs)    
			})
			.then(() => {
				set_champions_set(true)
			})
		}
	});

    const handleSubmit = e => {
        e.preventDefault()
		
        findSummoner(top)
        .then(async value => {
			set_top_rank(value.solo_queue)
			return joinChampionsMasteries(champions, value.masteries)
		})
		.then(function (result) {
			set_top_masteries({masteries: result})
		})

		findSummoner(jungle)
        .then(async value => {
			set_jungle_rank(value.solo_queue)
			return joinChampionsMasteries(champions, value.masteries)
		})
		.then(function (result) {
			set_jungle_masteries({masteries: result})
		})
		
		findSummoner(mid)
        .then(async value => {
			set_mid_rank(value.solo_queue)
			return joinChampionsMasteries(champions, value.masteries)
		})
		.then(function (result) {
			set_mid_masteries({masteries: result})
		})

		findSummoner(marksman)
        .then(async value => {
			set_marksman_rank(value.solo_queue)
			return joinChampionsMasteries(champions, value.masteries) 
		})
		.then(function (result) {
			set_marksman_masteries({masteries: result})
		})

		findSummoner(support)
        .then(async value => {
			set_support_rank(value.solo_queue)
			return joinChampionsMasteries(champions, value.masteries)
		})
		.then(function (result) {
			set_support_masteries({masteries: result})
		})

		new Promise(resolve => {
			setTimeout(() => {
				resolve(set_redirect(true))
			}, 2000)
		})
		console.log("click")
    }
    
    if (redirect) {    
		return (
			<div>
				<ChampionMasteriesDisplay 
					top={ top } top_masteries={ top_masteries } top_rank={ top_rank }
					jungle={ jungle } jungle_masteries={ jungle_masteries } jungle_rank={ jungle_rank }
					mid={ mid } mid_masteries={ mid_masteries } mid_rank={ mid_rank }
					marksman={ marksman } marksman_masteries={ marksman_masteries } marksman_rank={ marksman_rank }
					support={ support } support_masteries={ support_masteries } support_rank={ support_rank }
				/>

				<div>
					<button onClick={() => {
						set_redirect(false)
					}}>
						Scout New Team
					</button>
				</div>
			</div>
		)
    }
    else {
        return (
			<div>
				<form onSubmit={ handleSubmit }> 
					<table>
						<thead></thead>
						<tbody>
							<tr>
								<td>
									<table className={ style.summoner_table }>
										<thead>
											<tr>
												<th>Top</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<input 
														type='text' placeholder='Summoner Name' required
														value={ top } onChange={ e => set_top(e.target.value) }
														style={{ textAlign: 'center'}}
													/>
												</td>
											</tr>
										</tbody>
									</table>	
								</td>
								<td>
									<table className={ style.summoner_table }>
										<thead>
											<tr>
												<th>Jungle</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<input 
														type='text' placeholder='Summoner Name' required
														value={ jungle } onChange={ e => set_jungle(e.target.value) }
														style={{ textAlign: 'center'}}
													/>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
								<td>
									<table className={ style.summoner_table }>
										<thead>
											<tr>
												<th>Mid</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<input 
														type='text' placeholder='Summoner Name' required
														value={ mid } onChange={ e => set_mid(e.target.value) }
														style={{ textAlign: 'center'}}
													/>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
								<td>
									<table className={ style.summoner_table }>
										<thead>
											<tr>
												<th>Marksman</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<input 
														type='text' placeholder='Summoner Name' required
														value={ marksman } onChange={ e => set_marksman(e.target.value) }
														style={{ textAlign: 'center'}}
													/>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
								<td>
									<table className={ style.summoner_table }>
										<thead>
											<tr>
												<th>Support</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<input 
														type='text' placeholder='Summoner Name' required
														value={ support } onChange={ e => set_support(e.target.value) }
														style={{ textAlign: 'center'}}
													/>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<button type='submit'>Scout!</button>
				</form>
			</div>   
        )
    }
    
}

export default App;
let TEST = 3;
let VERSION = '1.9';

let NETWORK_ADDRESSES = {
	'kovan': '0xaf466c645c6d73f4f151e5b716eaea2db26ca623',
	'ropsten': '0x46c68814b2589875c0b80fc8bab93c4a7369ff4d',
};
let NETWORK_CREATE_CONTRACT_BLOCK = {
	'kovan': 14030623,
	'ropsten': 6714736,
};
let ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bee","type":"uint256"}],"name":"BeeUnlocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"bee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"count","type":"uint256"}],"name":"BeesBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"users","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BonusPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"medal","type":"uint256"}],"name":"MedalAwarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"quality","type":"uint256"}],"name":"QualityUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ReferrerPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"}],"name":"Registered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"honeyReward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"waxReward","type":"uint256"}],"name":"RewardCollected","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"UserAddedToBonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawed","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"ADMIN_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BEES_COUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"BEES_LEVELS_PRICES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"BEES_MONTHLY_PERCENTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"BEES_PRICES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BONUS_PERCENTS_PER_WEEK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BONUS_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"COINS_PER_ETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FIRST_BEE_AIRDROP_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"HONEY_DISCOUNT_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_BEES_PER_TARIFF","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MEDALS_COUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"MEDALS_POINTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"MEDALS_REWARDS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"QUALITIES_COUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"QUALITY_HONEY_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"QUALITY_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"REFERRAL_PERCENT_PER_LEVEL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"REFERRAL_POINT_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SUPERBEE_PERCENT_UNLOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SUPER_BEE_INDEX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TRON_BEE_INDEX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"__addUserToBonus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amountHoney","type":"uint256"},{"internalType":"uint256","name":"amountWax","type":"uint256"}],"name":"__gift","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"bonus","outputs":[{"internalType":"uint256","name":"threadPaid","type":"uint256"},{"internalType":"uint256","name":"lastPaidTime","type":"uint256"},{"internalType":"uint256","name":"numberOfUsers","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"bee","type":"uint256"},{"internalType":"uint256","name":"count","type":"uint256"}],"name":"buyBees","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"collect","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"collectMedals","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"instantBalance","outputs":[{"internalType":"uint256","name":"balanceHoney","type":"uint256"},{"internalType":"uint256","name":"balanceWax","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"payRepresentativeBonus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"playerBees","outputs":[{"internalType":"uint256[8]","name":"","type":"uint256[8]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"players","outputs":[{"internalType":"bool","name":"registered","type":"bool"},{"internalType":"bool","name":"airdropCollected","type":"bool"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint256","name":"balanceHoney","type":"uint256"},{"internalType":"uint256","name":"balanceWax","type":"uint256"},{"internalType":"uint256","name":"points","type":"uint256"},{"internalType":"uint256","name":"medals","type":"uint256"},{"internalType":"uint256","name":"qualityLevel","type":"uint256"},{"internalType":"uint256","name":"lastTimeCollected","type":"uint256"},{"internalType":"uint256","name":"unlockedBee","type":"uint256"},{"internalType":"uint256","name":"totalDeposited","type":"uint256"},{"internalType":"uint256","name":"totalWithdrawed","type":"uint256"},{"internalType":"uint256","name":"referralsTotalDeposited","type":"uint256"},{"internalType":"uint256","name":"subreferralsCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"referrals","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"retrieveBonus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"superBeeUnlocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalBeesBought","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalDeposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalPlayers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalWithdrawed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"bee","type":"uint256"}],"name":"unlock","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"updateQualityLevel","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"userBonusEarned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"userBonusPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"userRegisteredForBonus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

let NETID = { 'mainnet': 1, 'ropsten': 3, 'rinkeby': 4, 'kovan': 42 };
let NETID_BYINT = {
	'1': 'mainnet',
	'3': 'ropsten',
	'4': 'rinkeby',
	'42': 'kovan',
};

let CONTRACT_ADDRESS = NETWORK_ADDRESSES[NETID_BYINT[TEST]];
let NETWORK = NETID_BYINT[TEST];
let CREATE_CONTRACT_BLOCK = NETWORK_CREATE_CONTRACT_BLOCK[NETID_BYINT[TEST]];

let INFURA_URL = 'https://'+NETWORK+'.infura.io/v3/87d183c8a51b4abe8fa4360ad4293d4c';
let INFURA_URL_WS = 'wss://'+NETWORK+'.infura.io/ws/';
let web3infura = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
let web3ws = new Web3(new Web3.providers.HttpProvider(INFURA_URL_WS));

let COOKIE_NAME = 'storage';

let GOOGLE_API_KEY = "AIzaSyAdhoVexRaBv5xn1JfeDjM-UyYEpIqqU5U";
let GOOGLE_SPREASHEET_ID = "1UuYYkKjRoIT0pDomdeQztiukZGzMvaMtT4ZGEjDyC0Y";
let GOOGLE_SHEET_TAB_NAME = "EtherHives Representatives Application";
let GOOGLE_SPREASHEET_ID_LANG = "1-0q-QhIZIQF9B3PatAty9iIY_NaRlaWl0J6ugc6_olQ";
let GOOGLE_SHEET_TAB_NAME_LANG = "Phrases";


if (!web3infura.isConnected){
	console.log('Infura is not available');
}

/* ----- init variables ----- */
let total_invest = 0;
let total_withdraw = 0;

let unlockBeePrice = [];
let waxEqual1eth = 500000;
let honeyEqual1eth = 500000;
let isGetBeeMonthlyPercentsAndPrices = false;
let bee_monthly_percents = [];
let bee_levels_prices = [];
let isGetMedalsPoints = false;
let medals_points = [];
let medals_rewards = [];
let isGetQualityHoneyPercentsAndPrices = false;
let quality_honey_percents = [];
let quality_prices = [];
let isGetFirstBeeAirdropAmount = false;
let first_bee_airdrop_amount;
let ref = "0x0e3e702Bde7b5A65c94392597d90Ccb6B9B2427D";
let reflink;

let storage = {};
let isStorageLoad = false;
try {
	storage = JSON.parse(localStorage.getItem(COOKIE_NAME));
} catch(err){
	console.log("ERROR", "No access to localStorage");
}
if(storage == null){
	storage = {};
}
if(storage['refs'] == undefined){
	storage['refs'] = {};
}
if(storage['contract'] != CONTRACT_ADDRESS || storage['version'] != VERSION){
	storage = {};
	storage['contract'] = CONTRACT_ADDRESS;
	storage['version'] = VERSION;
	localStorage.setItem(COOKIE_NAME, JSON.stringify(storage));
}
isStorageLoad = true;

$.get('https://sheets.googleapis.com/v4/spreadsheets/' + GOOGLE_SPREASHEET_ID +
          '/values/' + GOOGLE_SHEET_TAB_NAME + '!A1:L200' + 
          '?key=' + GOOGLE_API_KEY, 
    function(data, result){
        if(result != "success"){
            console.log("ERROR", "get_google", err);
        } else {
        	ref = data.values[1][4];
        }
    });


getCoinsPerEth(web3infura).then(data => {
	waxEqual1eth = data.waxEqual1eth;
	honeyEqual1eth = data.honeyEqual1eth;
	$('#ethToWax').html(format_number(waxEqual1eth));
	$('#waxToEth').html(format_number(honeyEqual1eth));
}, error => { console.log("ERROR", "getCoinsPerEth", error); });

getMedalsPoints(web3infura).then(data => {
	medals_points = data.medals_points;
	medals_rewards = data.medals_rewards;
	isGetMedalsPoints = true;
}, error => { console.log("ERROR", "getMedalsPoints", error); });

getBeeMonthlyPercents(web3infura).then(data => {
	bee_monthly_percents = data.bee_monthly_percents;
	bee_levels_prices = data.bee_levels_prices;
	unlockBeePrice = data.unlockBeePrice;
	isGetBeeMonthlyPercentsAndPrices = true;

	for(let i = 0; i < bee_monthly_percents.length; i++){
		$('#bees_percent_level_'+(i+1)).html(bee_monthly_percents[i]);
	}
}, error => { console.log("ERROR", "getBeeMonthlyPercents", error); });

getQualityHoneyPercents(web3infura).then(data => {
	quality_honey_percents = data.quality_honey_percents;
	quality_prices = data.quality_prices;
	isGetQualityHoneyPercentsAndPrices = true;
}, error => { console.log("ERROR", "getQualityHoneyPercents", error) }); 

getFirstBeeAirdropAmount(web3infura).then(data => {
	first_bee_airdrop_amount = data.first_bee_airdrop_amount;
	isGetFirstBeeAirdropAmount = true;

	$('[name="first_bee_airdrop_amount"]').html(first_bee_airdrop_amount);
}, error => { console.log("ERROR", "getFirstBeeAirdropAmount", error); });

/* ----- global statistic ----- */
$('[name="link_contract_address"]').attr('href', 'https://'+NETWORK+'.etherscan.io/address/'+CONTRACT_ADDRESS+'#code');

getGlobalStatistic();

function getGlobalStatistic(){
	let total_invest_cursor = false;
	web3infura.eth.contract(ABI).at(CONTRACT_ADDRESS).totalDeposited(function(err, data){
		if(err){
			console.log("ERROR", "web3infura.totalDeposited", err);
		} else {
			total_invest = web3infura.toDecimal(data) / Math.pow(10,18);
			if(total_invest_cursor){
				$('.total_invest').html(format_number(total_invest+total_withdraw, 2));
			} else {
				total_invest_cursor = true;
			}
		}
	});

	web3infura.eth.contract(ABI).at(CONTRACT_ADDRESS).totalPlayers(function(err, data){
		if(err){
			console.log("ERROR", "web3infura.totalPlayers", err);
		} else {
			$('.total_players').html(format_number(web3infura.toDecimal(data)));
		}
	});

	web3infura.eth.contract(ABI).at(CONTRACT_ADDRESS).totalBeesBought(function(err, data){
		if(err){
			console.log("ERROR", "web3infura.totalBeesBought", err);
		} else {
			$('.total_bee_bought').html(format_number(web3infura.toDecimal(data)));
		}
	});

	web3infura.eth.contract(ABI).at(CONTRACT_ADDRESS).totalWithdrawed(function(err, data){
		if(err){
			console.log("ERROR", "web3infura.totalWithdrawed", err);
		} else {
			total_withdraw = web3infura.toDecimal(data) / Math.pow(10,18);
			$('.total_withdraw').html(format_number(total_withdraw, 2));
			if(total_invest_cursor){
				$('.total_invest').html(format_number(total_invest+total_withdraw, 2));
			} else {
				total_invest_cursor = true;
			}
		}
	});

	setTimeout(function(){
		if(storage["refs"] != undefined && Object.getOwnPropertyNames(storage["refs"]).length > 0){
			let leader = 0;
			for(let i = 1; i < Object.getOwnPropertyNames(storage["refs"]).length; i++){
				let user_ref_count = storage["refs"][Object.getOwnPropertyNames(storage["refs"])[i]].length;
				if(user_ref_count > leader){
					leader = user_ref_count;
				}
			}
			// let hive_leader = storage["refs"].sort((a, b) => (b.length - a.length));
			// if(hive_leader[Object.getOwnPropertyNames(hive_leader)[1]] != undefined){
			// 	leader = hive_leader[Object.getOwnPropertyNames(hive_leader)[1]].length;
			// }
			$('.hive_leader').html(leader);
		}
	}, 5000);
}


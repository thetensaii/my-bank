import Card from "components/Card";
import DoughnutChart, { DoughnutChartData } from "components/DoughnutChart";
import React from "react";
import { BsCircleFill } from "react-icons/bs";
import { CSS_COLORS } from "utils/constants";
import { AccountProps } from "utils/props/AccountProps";

import styles from "../../HomeCard.module.css";

type Account = AccountProps & {
	transactionsSum: number
}
export type ExpensesCardViewProps = {
	accounts: Account[];
	otherAccountsPresence: boolean;
	otherAccountsSum: number;
};


const accountClassNameByPosition = [
	styles.firstAccount,
	styles.secondAccount,
	styles.thirdAccount,
	styles.fourthAccount,
];
  

export const RecipesCardView: React.FC<ExpensesCardViewProps> = ({accounts, otherAccountsPresence, otherAccountsSum}) => {
	const data:DoughnutChartData = buildDoughnutData({accounts, otherAccountsPresence, otherAccountsSum});

	const total : number = accounts.reduce((sum, acc) => sum + acc.transactionsSum, 0) + otherAccountsSum

  return <Card title="Recettes">
	  <div className={styles.main}>
        {/* Multilayer Doughnut Chart */}
        <div className={styles.chart}>
			<div>Ce mois-ci</div>
			<DoughnutChart
				data={data}
				options={{
					responsive: false,
					maintainAspectRatio: false,
				}}
			/>
			<div className={styles.total}>{total}{" €"}</div>
		</div>
        {(accounts.length > 0) && (
          <ul>
            {accounts.map((a, idx) => (
                <li key={a.id} className={styles.account}>
                  <BsCircleFill
                    className={[
                      styles.bullet,
                      accountClassNameByPosition[idx],
                    ].join(" ")}
                  />
                  <span className={styles.accountName}>{a.name} </span>{" "}
                  {a.transactionsSum} €
                </li>
              ))}            
          </ul>
        )}
        {accounts.length === 0 && (
          <div>Pas de dépenses</div>
        )}
      </div>
  </Card>;
};

const accountColorByPosition = [
	CSS_COLORS.firstAccountColor,
	CSS_COLORS.secondAccountColor,
	CSS_COLORS.thirdAccountColor,
	CSS_COLORS.fourthAccountColor,
];

const buildDoughnutData = ({accounts, otherAccountsPresence, otherAccountsSum }: ExpensesCardViewProps): DoughnutChartData => {

	const data: DoughnutChartData = {
		labels: [],
		datasets: [
			{
				data: [],
				backgroundColor: [],
				borderWidth: 1,
			},
		],
	};

	if (accounts.length > 0) {
		data.labels = accounts.map((acc) => acc.name);
		data.datasets[0].data = accounts.map((acc) => acc.balance);
		data.datasets[0].backgroundColor = accounts.map(
		  (acc, idx) => accountColorByPosition[idx]
		);
	}

	if (otherAccountsPresence) {
		data.labels = data.labels
			? [...data.labels, "Autres comptes"]
			: ["Autres comptes"];
	
		data.datasets[0].data = [...data.datasets[0].data, otherAccountsSum];
		const backgroundColors: string[] = Array.isArray(
			data.datasets[0].backgroundColor
		)
			? [...data.datasets[0].backgroundColor]
			: [];

		data.datasets[0].backgroundColor = [
			...backgroundColors,
			CSS_COLORS.otherAccountColor,
		];
	}



	return data;
}
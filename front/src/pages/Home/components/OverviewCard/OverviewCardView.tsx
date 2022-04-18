import Card from "components/Card";
import React from "react";
import { AccountProps } from "utils/props/AccountProps";
import styles from "../../HomeCard.module.css";
import { BsCircleFill } from "react-icons/bs";
import { CSS_COLORS } from "utils/constants";
import DoughnutChart, { DoughnutChartData, DoughnutChartDataset } from "components/DoughnutChart";

type OverviewCardViewProps = {
  positiveAccounts: AccountProps[];
  positiveAccountsSum: number;
  otherAccountsPresence: boolean;
  otherAccountsSum: number;
  negativeAccountsPresence: boolean;
  negativeAccountsSum: number;
};

const accountClassNameByPosition = [
  styles.firstAccount,
  styles.secondAccount,
  styles.thirdAccount,
  styles.fourthAccount,
];

export const OverviewCardView: React.FC<OverviewCardViewProps> = ({
  positiveAccounts,
  positiveAccountsSum,
  otherAccountsPresence,
  otherAccountsSum,
  negativeAccountsPresence,
  negativeAccountsSum,
}) => {
  const data = buildDoughnutData({
    positiveAccounts,
    positiveAccountsSum,
    otherAccountsPresence,
    otherAccountsSum,
    negativeAccountsPresence,
    negativeAccountsSum,
  });

	const total : number = positiveAccountsSum + otherAccountsSum + negativeAccountsSum;

  return (
    <Card title="Synthèse des comptes">
      <div className={styles.main}>
        {/* Multilayer Doughnut Chart */}
		<div className={styles.chart}>
			<DoughnutChart
				data={data}
				options={{
					responsive: false,
					maintainAspectRatio: false,
				}}
			/>
			<div className={styles.total}>{total}{" €"}</div>
		</div>
        {(positiveAccounts.length > 0 || negativeAccountsPresence) && (
          <ul>
            {positiveAccounts &&
              positiveAccounts.slice().map((a, idx) => (
                <li key={a.id} className={styles.account}>
                  <BsCircleFill
                    className={[
                      styles.bullet,
                      accountClassNameByPosition[idx],
                    ].join(" ")}
                  />
                  <span className={styles.accountName}>{a.name} </span>{" "}
                  {a.balance} €
                </li>
              ))}

            {otherAccountsPresence && (
              <li className={styles.account}>
                <BsCircleFill
                  className={[styles.bullet, styles.otherAccounts].join(" ")}
                />
                <span className={styles.accountName}>Autres comptes</span>
                {otherAccountsSum} €
              </li>
            )}

            {negativeAccountsPresence && (
              <li className={styles.account}>
                <BsCircleFill
                  className={[styles.bullet, styles.negativesAccount].join(" ")}
                />
                <span className={styles.accountName}>Compte négatifs</span>
                {negativeAccountsSum} €
              </li>
            )}
          </ul>
        )}
        {positiveAccounts.length === 0 && !negativeAccountsPresence && (
          <div>Pas de compte</div>
        )}
      </div>
    </Card>
  );
};

const accountColorByPosition = [
  CSS_COLORS.firstAccountColor,
  CSS_COLORS.secondAccountColor,
  CSS_COLORS.thirdAccountColor,
  CSS_COLORS.fourthAccountColor,
];

const buildDoughnutData = ({
  positiveAccounts,
  positiveAccountsSum,
  otherAccountsPresence,
  otherAccountsSum,
  negativeAccountsPresence,
  negativeAccountsSum,
}: OverviewCardViewProps): DoughnutChartData => {
  // labels orders : [1er compte, 2eme compte, 3eme compte, 4eme compte, autres comptes, comptes negatifs, reste (pour compléter l'anneau negatif et avoir une belle forme)]
  // warning some can miss if we dont need them

  const data: DoughnutChartData= {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 1,
      },
    ],
  };

  // Set positive accounts data
  if (positiveAccounts.length > 0) {
    data.labels = positiveAccounts.map((acc) => acc.name);
    data.datasets[0].data = positiveAccounts.map((acc) => acc.balance);
    data.datasets[0].backgroundColor = positiveAccounts.map(
      (acc, idx) => accountColorByPosition[idx]
    );
  }

  // Set other positive accounts data
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

  if (negativeAccountsPresence) {
    data.labels = data.labels
      ? [...data.labels, "Comptes négatifs", ""]
      : ["Comptes négatifs", ""];

    const backgroundColors: string[] = Array.isArray(
      data.datasets[0].backgroundColor
    )
      ? [...data.datasets[0].backgroundColor]
      : [];

    const negativeDataset: DoughnutChartDataset = {
      data: [
        ...Array(data.datasets[0].data ? data.datasets[0].data.length : 0).fill(
          0
        ),
        negativeAccountsSum,
      ],
      backgroundColor: [
        ...backgroundColors,
        CSS_COLORS.negativeAccountsColor,
        CSS_COLORS.transparent,
      ],
      borderWidth: 0,
    };

    if (positiveAccountsSum > negativeAccountsSum * -1) {
      negativeDataset.data = [
        ...negativeDataset.data,
        positiveAccountsSum + negativeAccountsSum,
      ];
      data.datasets.push(negativeDataset);
    } else {
      data.datasets[0].data = data.datasets[0].data = [
        ...data.datasets[0].data,
        0,
        positiveAccountsSum + negativeAccountsSum,
      ];
      data.datasets[0].backgroundColor = [
        ...backgroundColors,
        CSS_COLORS.negativeAccountsColor,
        CSS_COLORS.transparent,
      ];
      data.datasets.unshift(negativeDataset);
    }
  }

  return data;
};

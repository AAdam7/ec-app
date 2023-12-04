import styles from "./../../styles/main.module.scss";

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;
  const barColor = () =>
    `
	border-radius: 3px;
	background-color:` +
    bgcolor +
    `; 
	width: ` +
    completed / 2 +
    `%; //scale changed for DummyAPI
	max-width: 100%;
	height: 4px;
`;

  return (
    <div class={[styles.progressbar, styles.containerStyles].join(" ")}>
      <div style={barColor()}>
        <span class={styles.labelStyles}></span>
      </div>
    </div>
  );
};

export default ProgressBar;

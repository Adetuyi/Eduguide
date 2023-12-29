import { Modal } from '../../ui';
import { Container } from './styles';
import { usePrediction } from '../../hooks';

const PredictionModal = ({ closeModal, student }) => {
	const { data: predictionData, isLoading } = usePrediction({ id: student?.id });

	const predictedScore = Math.round(
		predictionData?.predicted_exam_score > 70 ? 70 : predictionData?.predicted_exam_score < 0 ? 0 : predictionData?.predicted_exam_score
	);
	const passRemarks =
		'pass thier exams. Please do well to encourage this student to keep comimg to class and preparing well in advance for their assessments and exams.';
	const failRemarks =
		'fail thier exams. Please do well to encourage this student to come to class more often and prepare well in advance for their assessments and exams.';
	const struggleRemarks =
		'struggle in thier exams. Please do well to encourage this student to come to class more often and prepare well in advance for their assessments and exams so they can pass well.';

	const remarks =
		predictedScore + predictionData?.average_assessment_score >= 60
			? passRemarks
			: predictedScore + predictionData?.average_assessment_score < 45
			? failRemarks
			: struggleRemarks;

	return (
		<Modal closeModal={closeModal} loading={isLoading}>
			<Container>
				<div className="row--content">
					<div className="row--items">
						<span>Name</span>
						<p>
							{student?.first_name} {student?.last_name}
						</p>
					</div>
					<div className="row--items">
						<span>Matric Number</span>
						<p>{student?.matric_number}</p>
					</div>
					<div className="row--items">
						<span>Attendance Rate</span>
						<p>{predictionData?.attendance_rate}</p>
					</div>
					<div className="row--items">
						<span>Average Assessment Score</span>
						<p>{predictionData?.average_assessment_score}/30</p>
					</div>
					<div className="row--items column">
						<span>Remarks</span>
						<p>
							The predicted average exam score of <b>{student?.first_name}</b> is <b>{predictedScore}</b>. Adding this with the average assessment
							score gives <b>{predictedScore + predictionData?.average_assessment_score}</b>. This means that if this student keeps on progressing
							at this pace, they are most likely to {remarks}
						</p>
					</div>
					<br />
					<br />
					<p style={{ fontSize: '.75rem' }}>
						*Disclamer: This prediction is made using two factors: <b>Average Attendance Rate</b> and <b>Average Assessment Scores</b>. The
						attendance rate is not an effective paramenter for predicting, the assessment scores carries more weight but nontheless both are used
						by the Bayesian Ridge Algorithm to predict. This prediction is merely made of two variables therefore the accuracy cannot be relied
						on, however, it is still useful for identifying students at a higer chance of failing
					</p>
				</div>
			</Container>
		</Modal>
	);
};
export default PredictionModal;

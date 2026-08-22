import type { DiseaseConfig, DiseaseField } from './diseases';

export interface PredictionResult {
  diseaseId: string;
  positive: boolean;
  probability: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  message: string;
  contributingFactors: string[];
}

export type FormValues = Record<string, string | number>;

function num(values: FormValues, key: string): number {
  const v = values[key];
  return typeof v === 'number' ? v : parseFloat(String(v)) || 0;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function riskFromProb(p: number): 'Low' | 'Moderate' | 'High' {
  if (p < 0.34) return 'Low';
  if (p < 0.67) return 'Moderate';
  return 'High';
}

interface WeightedFactor {
  id: string;
  weight: number;
  transform: (v: number) => number;
  label: string;
  threshold: number;
}

function scoreDisease(
  diseaseId: string,
  values: FormValues,
  factors: WeightedFactor[],
  bias: number,
): { probability: number; contributing: string[] } {
  let logit = bias;
  const contributing: string[] = [];

  for (const f of factors) {
    const raw = num(values, f.id);
    const contribution = f.transform(raw) * f.weight;
    logit += contribution;
    if (contribution > f.threshold) {
      contributing.push(f.label);
    }
  }

  const probability = clamp(sigmoid(logit), 0.01, 0.99);
  return { probability, contributing: contributing.slice(0, 4) };
}

function predictDiabetes(values: FormValues) {
  return scoreDisease(
    'diabetes',
    values,
    [
      { id: 'glucose', weight: 0.9, transform: (v) => (v - 120) / 40, label: 'Elevated glucose level', threshold: 0.4 },
      { id: 'bmi', weight: 0.7, transform: (v) => (v - 28) / 8, label: 'High BMI', threshold: 0.3 },
      { id: 'age', weight: 0.5, transform: (v) => (v - 35) / 15, label: 'Older age group', threshold: 0.2 },
      { id: 'insulin', weight: 0.5, transform: (v) => (v - 80) / 60, label: 'Elevated insulin', threshold: 0.3 },
      { id: 'diabetesPedigree', weight: 0.8, transform: (v) => (v - 0.4) / 0.3, label: 'Family history indicator', threshold: 0.3 },
      { id: 'bloodPressure', weight: 0.3, transform: (v) => (v - 80) / 20, label: 'Elevated blood pressure', threshold: 0.2 },
    ],
    -0.4,
  );
}

function predictHeart(values: FormValues) {
  return scoreDisease(
    'heart',
    values,
    [
      { id: 'age', weight: 0.6, transform: (v) => (v - 50) / 15, label: 'Older age group', threshold: 0.3 },
      { id: 'cholesterol', weight: 0.7, transform: (v) => (v - 200) / 60, label: 'High cholesterol', threshold: 0.3 },
      { id: 'restingBP', weight: 0.5, transform: (v) => (v - 120) / 25, label: 'Elevated blood pressure', threshold: 0.3 },
      { id: 'maxHR', weight: -0.5, transform: (v) => (v - 150) / 30, label: 'Reduced max heart rate', threshold: -0.3 },
      { id: 'exerciseAngina', weight: 0.8, transform: (v) => v - 0.5, label: 'Exercise-induced angina', threshold: 0.3 },
      { id: 'oldpeak', weight: 0.7, transform: (v) => (v - 1) / 2, label: 'ST depression on exercise', threshold: 0.3 },
      { id: 'chestPainType', weight: 0.5, transform: (v) => (v - 1.5) / 1.5, label: 'Concerning chest pain type', threshold: 0.2 },
    ],
    -0.3,
  );
}

function predictParkinsons(values: FormValues) {
  return scoreDisease(
    'parkinsons',
    values,
    [
      { id: 'mdvpJitter', weight: 0.9, transform: (v) => (v - 0.005) / 0.01, label: 'Increased jitter (frequency variation)', threshold: 0.3 },
      { id: 'mdvpShimmer', weight: 0.9, transform: (v) => (v - 0.03) / 0.03, label: 'Increased shimmer (amplitude variation)', threshold: 0.3 },
      { id: 'hnr', weight: -0.7, transform: (v) => (v - 22) / 8, label: 'Reduced harmonics-to-noise ratio', threshold: -0.3 },
      { id: 'rpde', weight: 0.6, transform: (v) => (v - 0.5) / 0.3, label: 'Higher recurrence entropy', threshold: 0.3 },
      { id: 'dfa', weight: 0.6, transform: (v) => (v - 0.7) / 0.2, label: 'Elevated DFA value', threshold: 0.3 },
      { id: 'ppe', weight: 0.7, transform: (v) => (v - 0.2) / 0.2, label: 'Higher pitch period entropy', threshold: 0.3 },
      { id: 'spread1', weight: 0.7, transform: (v) => (v + 1) / 2, label: 'Abnormal spread1 measure', threshold: 0.3 },
    ],
    -0.2,
  );
}

function predictLiver(values: FormValues) {
  return scoreDisease(
    'liver',
    values,
    [
      { id: 'alt', weight: 0.9, transform: (v) => (v - 30) / 30, label: 'Elevated ALT enzyme', threshold: 0.3 },
      { id: 'ast', weight: 0.8, transform: (v) => (v - 30) / 30, label: 'Elevated AST enzyme', threshold: 0.3 },
      { id: 'alkPhos', weight: 0.6, transform: (v) => (v - 290) / 120, label: 'High alkaline phosphatase', threshold: 0.3 },
      { id: 'totalBilirubin', weight: 0.7, transform: (v) => (v - 1.2) / 3, label: 'Elevated total bilirubin', threshold: 0.3 },
      { id: 'directBilirubin', weight: 0.6, transform: (v) => (v - 0.4) / 1.5, label: 'Elevated direct bilirubin', threshold: 0.3 },
      { id: 'albumin', weight: -0.6, transform: (v) => (v - 3.5) / 1, label: 'Low albumin level', threshold: -0.3 },
      { id: 'age', weight: 0.3, transform: (v) => (v - 45) / 20, label: 'Older age group', threshold: 0.2 },
    ],
    -0.3,
  );
}

const predictors: Record<string, (v: FormValues) => { probability: number; contributing: string[] }> = {
  diabetes: predictDiabetes,
  heart: predictHeart,
  parkinsons: predictParkinsons,
  liver: predictLiver,
};

const resultMessages: Record<string, { positive: string; negative: string }> = {
  diabetes: {
    positive: 'The model indicates an elevated likelihood of diabetes. Elevated glucose, BMI, or family history appear to be contributing factors.',
    negative: 'The model indicates a low likelihood of diabetes based on the provided indicators. Continue regular health monitoring.',
  },
  heart: {
    positive: 'The model suggests an increased risk of heart disease. Key contributing factors may include cholesterol, blood pressure, or exercise response.',
    negative: 'The model suggests a low risk of heart disease based on the provided clinical measurements.',
  },
  parkinsons: {
    positive: 'The model indicates a higher likelihood of Parkinson\u2019s disease based on voice measurement features. Further clinical evaluation is recommended.',
    negative: 'The model indicates a low likelihood of Parkinson\u2019s disease from the provided voice measurements.',
  },
  liver: {
    positive: 'The model suggests an increased likelihood of liver disease. Elevated liver enzymes or bilirubin may be contributing factors.',
    negative: 'The model suggests a low likelihood of liver disease based on the provided liver-function indicators.',
  },
};

export function runPrediction(disease: DiseaseConfig, values: FormValues): PredictionResult {
  const predictor = predictors[disease.id];
  const { probability, contributing } = predictor
    ? predictor(values)
    : { probability: 0.2, contributing: [] as string[] };

  const positive = probability >= 0.5;
  const riskLevel = riskFromProb(probability);
  const messages = resultMessages[disease.id] ?? { positive: 'Prediction completed.', negative: 'Prediction completed.' };

  return {
    diseaseId: disease.id,
    positive,
    probability,
    riskLevel,
    message: positive ? messages.positive : messages.negative,
    contributingFactors: contributing,
  };
}

export function validateField(field: DiseaseField, value: string | number): string | null {
  if (value === '' || value === undefined || value === null) return 'This field is required.';
  if (field.type === 'number') {
    const n = typeof value === 'number' ? value : parseFloat(String(value));
    if (Number.isNaN(n)) return 'Please enter a valid number.';
    if (field.min !== undefined && n < field.min) return `Value must be at least ${field.min}.`;
    if (field.max !== undefined && n > field.max) return `Value must be at at most ${field.max}.`;
  }
  return null;
}

export function buildInitialValues(disease: DiseaseConfig): FormValues {
  const values: FormValues = {};
  for (const f of disease.fields) values[f.id] = f.defaultValue;
  return values;
}

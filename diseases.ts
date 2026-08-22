import {
  Activity,
  HeartPulse,
  Brain,
  Droplet,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';

export type FieldType = 'number' | 'select';

export interface DiseaseField {
  id: string;
  label: string;
  type: FieldType;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue: string | number;
  helper?: string;
}

export interface DiseaseConfig {
  id: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  fields: DiseaseField[];
}

export const diseases: DiseaseConfig[] = [
  {
    id: 'diabetes',
    name: 'Diabetes',
    shortName: 'Diabetes',
    description:
      'Estimates the likelihood of diabetes based on metabolic and clinical indicators such as glucose level, BMI, and insulin.',
    longDescription:
      'This module uses a logistic-regression-style model trained on features like glucose concentration, blood pressure, BMI, age, and family history to estimate diabetes risk.',
    icon: Droplet,
    color: 'primary',
    gradient: 'from-primary-500 to-accent-500',
    fields: [
      { id: 'pregnancies', label: 'Pregnancies', type: 'number', min: 0, max: 20, defaultValue: 1, helper: 'Number of times pregnant' },
      { id: 'glucose', label: 'Glucose', type: 'number', unit: 'mg/dL', min: 0, max: 300, step: 1, defaultValue: 120, helper: 'Plasma glucose concentration (2h test)' },
      { id: 'bloodPressure', label: 'Blood Pressure', type: 'number', unit: 'mm Hg', min: 0, max: 200, defaultValue: 70, helper: 'Diastolic blood pressure' },
      { id: 'skinThickness', label: 'Skin Thickness', type: 'number', unit: 'mm', min: 0, max: 100, defaultValue: 20, helper: 'Triceps skinfold thickness' },
      { id: 'insulin', label: 'Insulin', type: 'number', unit: 'mu U/ml', min: 0, max: 1000, defaultValue: 79, helper: '2-Hour serum insulin' },
      { id: 'bmi', label: 'BMI', type: 'number', unit: 'kg/m²', min: 0, max: 80, step: 0.1, defaultValue: 32, helper: 'Body mass index' },
      { id: 'diabetesPedigree', label: 'Diabetes Pedigree Function', type: 'number', min: 0, max: 3, step: 0.01, defaultValue: 0.47, helper: 'Genetic likelihood score' },
      { id: 'age', label: 'Age', type: 'number', unit: 'years', min: 1, max: 120, defaultValue: 33 },
    ],
  },
  {
    id: 'heart',
    name: 'Heart Disease',
    shortName: 'Heart',
    description:
      'Assesses cardiovascular risk using clinical measurements, chest pain type, and cardiac test results.',
    longDescription:
      'A classification model that combines age, cholesterol, chest pain type, maximum heart rate, and exercise-induced angina to predict the presence of heart disease.',
    icon: HeartPulse,
    color: 'danger',
    gradient: 'from-rose-500 to-danger-500',
    fields: [
      { id: 'age', label: 'Age', type: 'number', unit: 'years', min: 1, max: 120, defaultValue: 55 },
      {
        id: 'sex', label: 'Sex', type: 'select',
        options: [{ value: '1', label: 'Male' }, { value: '0', label: 'Female' }],
        defaultValue: '1',
      },
      {
        id: 'chestPainType', label: 'Chest Pain Type', type: 'select',
        options: [
          { value: '0', label: 'Typical angina' },
          { value: '1', label: 'Atypical angina' },
          { value: '2', label: 'Non-anginal pain' },
          { value: '3', label: 'Asymptomatic' },
        ],
        defaultValue: '0',
      },
      { id: 'restingBP', label: 'Resting Blood Pressure', type: 'number', unit: 'mm Hg', min: 0, max: 250, defaultValue: 130 },
      { id: 'cholesterol', label: 'Cholesterol', type: 'number', unit: 'mg/dL', min: 0, max: 600, defaultValue: 250 },
      { id: 'fastingBS', label: 'Fasting Blood Sugar > 120 mg/dL', type: 'select', options: [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }], defaultValue: '0' },
      {
        id: 'restingECG', label: 'Resting ECG', type: 'select',
        options: [
          { value: '0', label: 'Normal' },
          { value: '1', label: 'ST-T wave abnormality' },
          { value: '2', label: 'Left ventricular hypertrophy' },
        ],
        defaultValue: '0',
      },
      { id: 'maxHR', label: 'Max Heart Rate', type: 'number', unit: 'bpm', min: 60, max: 250, defaultValue: 150 },
      { id: 'exerciseAngina', label: 'Exercise-Induced Angina', type: 'select', options: [{ value: '1', label: 'Yes' }, { value: '0', label: 'No' }], defaultValue: '0' },
      { id: 'oldpeak', label: 'Oldpeak (ST depression)', type: 'number', unit: 'mm', min: 0, max: 10, step: 0.1, defaultValue: 1.5 },
      {
        id: 'slope', label: 'Slope of Peak Exercise ST', type: 'select',
        options: [{ value: '0', label: 'Upsloping' }, { value: '1', label: 'Flat' }, { value: '2', label: 'Downsloping' }],
        defaultValue: '1',
      },
    ],
  },
  {
    id: 'parkinsons',
    name: "Parkinson's Disease",
    shortName: "Parkinson's",
    description:
      'Evaluates the likelihood of Parkinson\u2019s disease from vocal measurement features used in biomedical voice analysis.',
    longDescription:
      'A model trained on biomedical voice measurements — including frequency variation, amplitude, and nonlinear dynamical measures — to screen for Parkinson\u2019s disease.',
    icon: Brain,
    color: 'accent',
    gradient: 'from-accent-500 to-primary-500',
    fields: [
      { id: 'mdvpFo', label: 'MDVP:Fo (Hz)', type: 'number', unit: 'Hz', min: 80, max: 300, step: 0.001, defaultValue: 154, helper: 'Average vocal fundamental frequency' },
      { id: 'mdvpFhi', label: 'MDVP:Fhi (Hz)', type: 'number', unit: 'Hz', min: 80, max: 400, step: 0.001, defaultValue: 197, helper: 'Maximum vocal fundamental frequency' },
      { id: 'mdvpFlo', label: 'MDVP:Flo (Hz)', type: 'number', unit: 'Hz', min: 60, max: 250, step: 0.001, defaultValue: 116, helper: 'Minimum vocal fundamental frequency' },
      { id: 'mdvpJitter', label: 'MDVP:Jitter (%)', type: 'number', unit: '%', min: 0, max: 10, step: 0.001, defaultValue: 0.006, helper: 'Frequency variation' },
      { id: 'mdvpShimmer', label: 'MDVP:Shimmer (dB)', type: 'number', unit: 'dB', min: 0, max: 5, step: 0.001, defaultValue: 0.034, helper: 'Amplitude variation' },
      { id: 'hnr', label: 'HNR', type: 'number', unit: 'dB', min: 0, max: 40, step: 0.01, defaultValue: 21.4, helper: 'Harmonics-to-noise ratio' },
      { id: 'rpde', label: 'RPDE', type: 'number', min: 0, max: 1, step: 0.001, defaultValue: 0.5, helper: 'Recurrence period density entropy' },
      { id: 'dfa', label: 'DFA', type: 'number', min: 0, max: 1, step: 0.001, defaultValue: 0.7, helper: 'Detrended fluctuation analysis' },
      { id: 'spread1', label: 'Spread1', type: 'number', min: -8, max: 4, step: 0.001, defaultValue: -1.2, helper: 'Nonlinear measure of frequency variation' },
      { id: 'spread2', label: 'Spread2', type: 'number', min: 0, max: 1, step: 0.001, defaultValue: 0.2, helper: 'Nonlinear measure of frequency variation' },
      { id: 'd2', label: 'D2', type: 'number', min: 0, max: 5, step: 0.001, defaultValue: 2.3, helper: 'Correlation dimension' },
      { id: 'ppe', label: 'PPE', type: 'number', min: 0, max: 1, step: 0.001, defaultValue: 0.2, helper: 'Pitch period entropy' },
    ],
  },
  {
    id: 'liver',
    name: 'Liver Disease',
    shortName: 'Liver',
    description:
      'Predicts liver disease risk from liver-function blood tests, proteins, and patient demographics.',
    longDescription:
      'A classifier that uses liver enzyme levels (ALT, AST), bilirubin, proteins, albumin, age, and gender to estimate the likelihood of liver disease.',
    icon: Stethoscope,
    color: 'warning',
    gradient: 'from-amber-500 to-warning-500',
    fields: [
      { id: 'age', label: 'Age', type: 'number', unit: 'years', min: 1, max: 120, defaultValue: 45 },
      { id: 'gender', label: 'Gender', type: 'select', options: [{ value: '1', label: 'Male' }, { value: '0', label: 'Female' }], defaultValue: '1' },
      { id: 'totalBilirubin', label: 'Total Bilirubin', type: 'number', unit: 'mg/dL', min: 0, max: 80, step: 0.1, defaultValue: 1.2 },
      { id: 'directBilirubin', label: 'Direct Bilirubin', type: 'number', unit: 'mg/dL', min: 0, max: 40, step: 0.1, defaultValue: 0.4 },
      { id: 'alkPhos', label: 'Alkaline Phosphotase', type: 'number', unit: 'IU/L', min: 0, max: 2000, defaultValue: 290 },
      { id: 'alt', label: 'Alanine Aminotransferase (ALT)', type: 'number', unit: 'IU/L', min: 0, max: 2000, defaultValue: 35 },
      { id: 'ast', label: 'Aspartate Aminotransferase (AST)', type: 'number', unit: 'IU/L', min: 0, max: 2000, defaultValue: 30 },
      { id: 'totalProteins', label: 'Total Proteins', type: 'number', unit: 'g/dL', min: 0, max: 15, step: 0.1, defaultValue: 6.8 },
      { id: 'albumin', label: 'Albumin', type: 'number', unit: 'g/dL', min: 0, max: 8, step: 0.1, defaultValue: 3.4 },
      { id: 'agRatio', label: 'Albumin/Globulin Ratio', type: 'number', min: 0, max: 4, step: 0.1, defaultValue: 0.9 },
    ],
  },
];

export function getDisease(id: string): DiseaseConfig | undefined {
  return diseases.find((d) => d.id === id);
}

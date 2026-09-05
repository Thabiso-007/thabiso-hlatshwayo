/**
 * Minimal line-art glyphs for individual AWS services.
 *
 * Why this file exists: react-icons v5 no longer ships per-service AWS icons
 * (Simple Icons dropped Amazon AWS entries). Only the generic `FaAws` logo is
 * available, which would mean the same icon repeated nine times. These are
 * lightweight stroke SVGs in the AWS orange so each service is distinguishable.
 */

type AwsGlyphName =
  | 'ec2'
  | 'eks'
  | 'rds'
  | 'secrets'
  | 'ssm'
  | 'route53'
  | 'iam'
  | 'cloudwatch'
  | 'acm';

const PATHS: Record<AwsGlyphName, string[]> = {
  // EC2 - virtual server / instance
  ec2: [
    'M4 5h16v6H4z',
    'M4 13h16v6H4z',
    'M7.5 8h.01',
    'M7.5 16h.01',
    'M11 8h5',
    'M11 16h5',
  ],
  // EKS - Kubernetes wheel
  eks: [
    'M12 3.2 19.6 7.6v8.8L12 20.8 4.4 16.4V7.6z',
    'M12 8.6 15 10.3v3.4L12 15.4 9 13.7v-3.4z',
    'M12 3.2v5.4',
    'M19.6 16.4 15 13.7',
    'M4.4 16.4 9 13.7',
  ],
  // RDS - managed relational database
  rds: [
    'M5 6c0-1.1 3.13-2 7-2s7 .9 7 2-3.13 2-7 2-7-.9-7-2z',
    'M5 6v12c0 1.1 3.13 2 7 2s7-.9 7-2V6',
    'M5 12c0 1.1 3.13 2 7 2s7-.9 7-2',
  ],
  // Secrets Manager - vault / safe
  secrets: [
    'M4 5h16v14H4z',
    'M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z',
    'M12 12h.01',
    'M12 9.2V7.6',
  ],
  // Parameter Store - configuration values / sliders
  ssm: [
    'M4 7h16',
    'M4 12h16',
    'M4 17h16',
    'M9 4.6v4.8',
    'M15 9.6v4.8',
    'M8 14.6v4.8',
  ],
  // Route 53 - DNS, routing to an endpoint
  route53: [
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
    'M3 12h18',
    'M12 3c2.4 2.6 3.4 5.8 3.4 9S14.4 18.4 12 21c-2.4-2.6-3.4-5.8-3.4-9S9.6 5.6 12 3z',
  ],
  // IAM - identity + access policy
  iam: [
    'M12 3.4 19 6v5.6c0 4.2-2.8 7.2-7 8.9-4.2-1.7-7-4.7-7-8.9V6z',
    'M12 8.6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z',
    'M9.4 15.4c.5-1.3 1.5-2 2.6-2s2.1.7 2.6 2',
  ],
  // CloudWatch - monitoring dashboard
  cloudwatch: [
    'M3.5 5h17v11h-17z',
    'M7 12l2.5-2.5 2 2L15 8',
    'M9.5 19.5h5',
    'M12 16v3.5',
  ],
  // Certificate Manager - certificate with seal
  acm: [
    'M5 3.5h14v11H5z',
    'M8 7.2h8',
    'M8 10.4h5',
    'M15.5 13.4a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8z',
    'M14 17.6 13.2 21l2.3-1.2 2.3 1.2-.8-3.4',
  ],
};

export default function AwsGlyph({ name }: { name: AwsGlyphName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="w-7 h-7"
    >
      {PATHS[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/**
 * Minimal line-art glyphs for individual AWS services.
 *
 * Why this file exists: react-icons v5 no longer ships per-service AWS icons
 * (Simple Icons dropped Amazon AWS entries). Only the generic `FaAws` logo is
 * available, which would mean the same icon repeated for every service. These
 * lightweight stroke SVGs make the services distinguishable in AWS orange.
 */

type AwsGlyphName =
  | 'ec2'
  | 'eks'
  | 'lambda'
  | 's3'
  | 'rds'
  | 'vpc'
  | 'secrets'
  | 'ssm'
  | 'route53'
  | 'iam'
  | 'cloudwatch'
  | 'cloudformation'
  | 'dms'
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
  // Lambda - serverless functions
  lambda: [
    'M7 4h3l5 15h3',
    'M12 12 8 19H6',
  ],
  // S3 - object storage bucket
  s3: [
    'M4 5h16v2H4z',
    'M5 7l1.5 12h11L19 7',
    'M9 11h6',
    'M9 14h6',
  ],
  // RDS - managed relational database
  rds: [
    'M5 6c0-1.1 3.13-2 7-2s7 .9 7 2-3.13 2-7 2-7-.9-7-2z',
    'M5 6v12c0 1.1 3.13 2 7 2s7-.9 7-2V6',
    'M5 12c0 1.1 3.13 2 7 2s7-.9 7-2',
  ],
  // VPC - private network and connected resources
  vpc: [
    'M4 4h16v16H4z',
    'M12 7v4',
    'M7 16v-3h10v3',
    'M12 11v2',
    'M6 16h2v2H6z',
    'M16 16h2v2h-2z',
    'M11 5h2v2h-2z',
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
  // CloudFormation - infrastructure templates
  cloudformation: [
    'M4 4h13v13H4z',
    'M8 17v3h12V8h-3',
    'M9 8l-2 2.5L9 13',
    'M12 8l2 2.5-2 2.5',
  ],
  // DMS - database migration
  dms: [
    'M3 6c0-1.1 2-2 4.5-2S12 4.9 12 6 10 8 7.5 8 3 7.1 3 6z',
    'M3 6v9c0 1.1 2 2 4.5 2S12 16.1 12 15V6',
    'M3 10.5c0 1.1 2 2 4.5 2S12 11.6 12 10.5',
    'M14 14h6',
    'M17.5 11.5 20 14l-2.5 2.5',
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

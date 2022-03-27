import './_styles.scss';
import log from './changelog.md';

export const changelog = log;

// Note: this depends on keeping a semantic structure in changelog.md wherein each release is marked with it's own <h2>
export const latestLogEntry = log.substring(0, getPosition(log, '<h2', 2));

function getPosition(string: string, occurenceString: string, occurenceIndex: number): number {
  return string.split(occurenceString, occurenceIndex).join(occurenceString).length;
}

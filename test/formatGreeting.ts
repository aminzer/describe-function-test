const formatGreeting = ({ personName }: { personName?: string } = {}): string => {
  if (personName) {
    return `Welcome, ${personName}!`;
  }

  return `Welcome!`;
};

export default formatGreeting;

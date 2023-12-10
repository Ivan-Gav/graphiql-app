import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import Footer from '../components/Footer/Footer';

const TestFooter = () => {
  return (
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
};

describe('Footer', () => {
  it('renders team title', () => {
    render(<TestFooter />);

    const teamTitle = screen.getByRole('heading', { level: 2 });

    expect(teamTitle).toHaveTextContent(/the team/i);
  });

  it('renders links to authors GitHub pages', () => {
    render(<TestFooter />);

    const ghLinks = screen.getAllByTestId('member-gh-link');

    expect(ghLinks).toHaveLength(3);

    ghLinks.forEach((ghLink) =>
      expect(ghLink).toHaveAttribute(
        'href',
        expect.stringContaining('https://github.com/')
      )
    );
  });

  it('renders RS School logo with link to the course', async () => {
    render(<TestFooter />);

    const rsLogoLink = screen.getByTestId('rss-link');
    const rsLogo = await screen.findByAltText('RSS');

    expect(rsLogoLink).toContainElement(rsLogo);
    expect(rsLogo).toBeInstanceOf(HTMLImageElement);
    expect(rsLogo).toHaveAttribute(
      'src',
      'https://rs.school/images/rs_school.svg'
    );
    expect(rsLogo).toBeVisible();

    expect(rsLogoLink).toHaveAttribute('href', 'https://rs.school/react/');
  });

  // it('renders Sign Up button', () => {
  //   render(<TestFooter />);

  //   const signUpLink = screen.getByRole('link', { name: 'SignUp' });

  //   expect(signUpLink).toHaveAttribute('href', '/signup');
  // });
});

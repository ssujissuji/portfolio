import { Fragment } from 'react';
import type { Project } from '../content';
import { ExternalLink, Icon, SectionHeading } from './common';

function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  return (
    <div className={`proj-card reveal${delay ? ` d${delay}` : ''}`}>
      <div className="proj-thumb">
        <img src={project.image} alt={`${project.name} 프로젝트`} />
        <span className={`proj-type-badge ${project.type}`}>
          {project.type === 'personal' ? '개인' : '팀'}
        </span>
      </div>
      <div className="proj-body">
        <div className="proj-name">{project.name}</div>
        <div className="proj-desc">{project.description}</div>
        <div className="proj-tags">
          {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        {project.roles.length > 0 && (
          <div className="proj-roles">
            <div className="proj-role-label">Role</div>
            <ul className="proj-role-list">
              {project.roles.map((role) => <li key={role}>{role}</li>)}
            </ul>
          </div>
        )}
        <div className="proj-links">
          {project.links.map((link) => (
            <ExternalLink className="proj-link" href={link.url} key={link.url}>
              <Icon name={link.icon} /> {link.label}
            </ExternalLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OtherProjects({ projects }: { projects: Project[] }) {
  const groups = [
    { type: 'team', label: '팀 프로젝트' },
    { type: 'personal', label: '개인 프로젝트' },
  ] as const;

  return (
    <section className="proj-sec">
      <SectionHeading
        eyebrow="Other Projects"
        title="더 많은 프로젝트"
        subtitle="팀과 함께, 그리고 혼자서 만든 결과물입니다."
      />
      <div className="proj-grid">
        {groups.map((group) => {
          const groupProjects = projects.filter((project) => project.type === group.type);
          if (groupProjects.length === 0) return null;

          return (
            <Fragment key={group.type}>
              <div className="proj-group-label">{group.label}</div>
              {groupProjects.map((project, index) => (
                <ProjectCard project={project} delay={Math.min(index, 3)} key={project.name} />
              ))}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}

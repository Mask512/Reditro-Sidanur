import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadCrumbProps {
  pageName: string;
  parentLinks: { href: string; label: string }[];
}

export const BreadCrumb = ({ pageName, parentLinks }: BreadCrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parentLinks.map((link, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={link.href}>{link.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{pageName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

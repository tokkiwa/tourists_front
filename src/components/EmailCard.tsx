import React from 'react';
import { EmailInfo } from '../services/api';
import './EmailCard.css';

interface EmailCardProps {
    email: EmailInfo;
    onExpand?: (email: EmailInfo) => void;
}

const EmailCard: React.FC<EmailCardProps> = ({ email, onExpand }) => {
    const formatDate = (timestamp: string) => {
        return new Date(timestamp).toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const truncateText = (text: string, maxLength: number = 200) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const getSenderDomain = (email: string) => {
        return email.split('@')[1] || '';
    };

    const getSenderTypeClass = (senderEmail: string) => {
        if (senderEmail.includes('amazon')) return 'amazon';
        if (senderEmail.includes('vpass')) return 'credit-card';
        if (senderEmail.includes('gmail')) return 'personal';
        return 'other';
    };

    return (
        <div className={`email-card ${getSenderTypeClass(email.sender_email)}`}>
            <div className="email-header">
                <div className="sender-info">
                    <div className="sender-name">
                        {email.sender_raw.replace(/<.*>/, '').trim() || email.sender_email}
                    </div>
                    <div className="sender-email">{email.sender_email}</div>
                    <div className="sender-domain">{getSenderDomain(email.sender_email)}</div>
                </div>
                <div className="timestamp">
                    {formatDate(email.timestamp)}
                </div>
            </div>

            <div className="email-subject">
                <h3>{email.subject}</h3>
            </div>

            <div className="email-body-preview">
                <pre>{truncateText(email.body)}</pre>
            </div>

            <div className="email-actions">
                <button
                    className="expand-btn"
                    onClick={() => onExpand && onExpand(email)}
                >
                    詳細を表示
                </button>
                <div className="message-id">
                    ID: {email.message_id.substring(0, 8)}...
                </div>
            </div>
        </div>
    );
};

export default EmailCard;

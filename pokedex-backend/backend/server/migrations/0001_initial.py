# Generated by Django 5.0.3 on 2024-03-27 23:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Counter',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('count', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'Counter',
                'managed': False,
            },
        ),
    ]